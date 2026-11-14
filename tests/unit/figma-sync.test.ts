import { readFileSync } from "node:fs"
import ts from "typescript"
import { describe, expect, test } from "vitest"
import { figmaTheme, type FigmaColor } from "../../src/utils/figma-tokens"
import { fakeFigma, runSync, SYNC_SOURCE } from "./fake-figma"

const theme = figmaTheme(
  JSON.parse(readFileSync("packages/opui/tokens.json", "utf8")),
  JSON.parse(readFileSync("src/figma/default.json", "utf8")),
  "opui",
)
const definition = (name: string) =>
  theme.variables.find((entry) => entry.name === name)!
const lightColor = (name: string) => definition(name).values.light as FigmaColor

describe("opuiFigmaSync", () => {
  test("creates one collection with a mode per theme mode", async () => {
    const fake = fakeFigma()
    const report = await runSync(fake.figma, theme)
    expect(fake.collections.map(({ name }) => name)).toEqual(["opui"])
    expect(fake.collections[0].modes.map(({ name }) => name)).toEqual([
      "Light",
      "Dark",
      "Light more contrast",
      "Dark more contrast",
    ])
    expect(report.variables.created).toBe(theme.variables.length)
    expect(report.warnings).toEqual([])
  })

  test("writes code syntax, scopes, descriptions and hides the primitives", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const surface = fake.variables.find(
      ({ name }) => name === "surfaces/ui-surface",
    )
    expect(surface).toMatchObject({
      codeSyntax: { WEB: "var(--ui-surface)" },
      description: definition("surfaces/ui-surface").description,
      hiddenFromPublishing: false,
      resolvedType: "COLOR",
      scopes: ["FRAME_FILL", "SHAPE_FILL"],
    })
    expect(
      fake.variables.find(({ name }) => name === "palette-steps/ui-color-1"),
    ).toMatchObject({ hiddenFromPublishing: true, scopes: [] })
  })

  test("links aliases to their target variable", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const [aliased, target] = Object.entries(
      definition("typography/ui-font-size-body").values,
    ).flatMap(([, value]) =>
      typeof value === "object" && "alias" in value
        ? [
            fake.variables.find(
              ({ name }) => name === "typography/ui-font-size-body",
            )!,
            fake.variables.find(({ name }) => name === value.alias)!,
          ]
        : [],
    )
    expect(Object.values(aliased.valuesByMode)[0]).toEqual({
      id: target.id,
      type: "VARIABLE_ALIAS",
    })
  })

  test("writes colors in sRGB, or in Display P3 in a P3 file", async () => {
    const srgb = fakeFigma()
    await runSync(srgb.figma, theme)
    const p3 = fakeFigma({ profile: "DISPLAY_P3" })
    await runSync(p3.figma, theme)
    const value = (fake: ReturnType<typeof fakeFigma>) =>
      Object.values(
        fake.variables.find(({ name }) => name === "primary/ui-primary")!
          .valuesByMode,
      )[0]
    const { alpha, p3: wide, srgb: narrow } = lightColor("primary/ui-primary")
    expect(value(srgb)).toEqual({
      a: alpha,
      b: narrow[2],
      g: narrow[1],
      r: narrow[0],
    })
    expect(value(p3)).toEqual({ a: alpha, b: wide[2], g: wide[1], r: wide[0] })
  })

  test("gives each mode a collection when the plan allows one mode", async () => {
    const fake = fakeFigma({ modeLimit: 1 })
    const report = await runSync(fake.figma, theme)
    expect(fake.collections.map(({ name }) => name)).toEqual([
      "opui Light",
      "opui Dark",
      "opui Light more contrast",
      "opui Dark more contrast",
    ])
    expect(report.warnings[0]).toContain("each mode has a collection")
    const surfaces = fake.variables.filter(
      ({ name }) => name === "surfaces/ui-surface",
    )
    expect(
      new Set(surfaces.map((entry) => entry.variableCollectionId)).size,
    ).toBe(4)
  })

  test("leaves the modes of a collection it can't fill as they were", async () => {
    const fake = fakeFigma({ modeLimit: 2 })
    const base = fake.figma.variables.createVariableCollection("opui")
    fake.figma.variables.createVariable("custom/brand", base, "COLOR")
    const modes = base.modes.map(({ name }) => name)
    const report = await runSync(fake.figma, theme)
    expect(base.modes.map(({ name }) => name)).toEqual(modes)
    expect(report.collections.map(({ name }) => name)).toEqual([
      "opui Light",
      "opui Dark",
      "opui Light more contrast",
      "opui Dark more contrast",
    ])
    const empty = fakeFigma({ modeLimit: 2 })
    const unused = empty.figma.variables.createVariableCollection("opui")
    await runSync(empty.figma, theme)
    expect(unused.modes.map(({ name }) => name)).toEqual(modes)
  })

  test("updates the same variables and styles when it runs again", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const ids = fake.variables.map(({ id }) => id)
    const report = await runSync(fake.figma, theme)
    expect(fake.variables.map(({ id }) => id)).toEqual(ids)
    expect(report.variables).toEqual({
      created: 0,
      updated: theme.variables.length,
    })
    expect(fake.effectStyles).toHaveLength(theme.effects.length)
    expect(fake.textStyles).toHaveLength(theme.text.length)
  })

  test("leaves a variable of another type alone and says so", async () => {
    const fake = fakeFigma()
    const collection = fake.figma.variables.createVariableCollection("opui")
    fake.figma.variables.createVariable(
      "surfaces/ui-surface",
      collection,
      "STRING",
    )
    const report = await runSync(fake.figma, theme)
    expect(report.warnings).toContain(
      "surfaces/ui-surface is a STRING variable in this file, so it was left as it is.",
    )
  })

  test("says which variables in the collection the theme doesn't have", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    fake.figma.variables.createVariable(
      "custom/brand",
      fake.collections[0],
      "COLOR",
    )
    const report = await runSync(fake.figma, theme)
    expect(report.warnings).toContain(
      "opui has 1 variables this theme doesn't: custom/brand.",
    )
  })

  test("runs in parts, linking aliases and styles to variables an earlier part made", async () => {
    const fake = fakeFigma()
    const half = Math.floor(theme.variables.length / 2)
    const first = await runSync(
      fake.figma,
      {
        ...theme,
        effects: [],
        text: [],
        variables: theme.variables.slice(0, half),
      },
      { partial: true },
    )
    const second = await runSync(
      fake.figma,
      {
        ...theme,
        effects: [],
        text: [],
        variables: theme.variables.slice(half),
      },
      { partial: true },
    )
    const styles = await runSync(
      fake.figma,
      { ...theme, variables: [] },
      { partial: true },
    )
    expect([...first.warnings, ...second.warnings, ...styles.warnings]).toEqual(
      [],
    )
    const whole = fakeFigma()
    await runSync(whole.figma, theme)
    const values = (fake: ReturnType<typeof fakeFigma>) =>
      fake.variables.map(({ name, valuesByMode }) => [
        name,
        Object.values(valuesByMode).map((value) =>
          typeof value === "object" && value && "id" in value
            ? fake.variables.find(({ id }) => id === value.id)?.name
            : value,
        ),
      ])
    expect(Object.fromEntries(values(fake))).toEqual(
      Object.fromEntries(values(whole)),
    )
    expect(
      fake.textStyles.find(({ name }) => name === "heading/h1")!.boundVariables
        .fontFamily,
    ).toBeDefined()
    expect(
      fake.effectStyles.find(
        ({ name }) => name === "elevation/ui-shadow-elevated",
      )!.effects[0].boundVariables?.color,
    ).toBeDefined()
  })

  test("binds each shadow layer of an effect style to its variables", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const elevated = fake.effectStyles.find(
      ({ name }) => name === "elevation/ui-shadow-elevated",
    )!
    const layer = theme.effects.find(
      ({ name }) => name === "elevation/ui-shadow-elevated",
    )!.layers[0]
    const color = fake.variables.find(({ name }) => name === layer.color)!
    expect(elevated.effects[0]).toMatchObject({
      boundVariables: { color: { id: color.id, type: "VARIABLE_ALIAS" } },
      type: "DROP_SHADOW",
      visible: true,
    })
    expect(elevated.description).toContain("var(--ui-shadow-elevated)")
  })

  test("builds text styles from the fonts the file has", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const heading = fake.textStyles.find(({ name }) => name === "heading/h1")!
    expect(heading).toMatchObject({
      fontName: { family: "Inter", style: "Bold" },
      fontSize: 56,
      letterSpacing: { unit: "PIXELS", value: -1.12 },
      lineHeight: { unit: "PIXELS", value: 64 },
    })
    const size = fake.variables.find(
      ({ name }) => name === "typography/ui-font-size-h1",
    )!
    expect(heading.boundVariables.fontSize).toEqual({
      id: size.id,
      type: "VARIABLE_ALIAS",
    })
    expect(
      fake.textStyles.find(({ name }) => name === "code")!.fontName,
    ).toEqual({ family: "Inconsolata", style: "Regular" })
    expect(fake.loaded).toContainEqual({ family: "Inter", style: "Bold" })
  })

  test("binds a text style to a font variable that aliases another", async () => {
    const body = definition("typography/ui-font-body")
    const heading = {
      ...body,
      name: "typography/ui-font-heading",
      values: Object.fromEntries(
        Object.keys(body.values).map((mode) => [mode, { alias: body.name }]),
      ),
    }
    const fake = fakeFigma()
    await runSync(fake.figma, {
      ...theme,
      text: theme.text.map((style) =>
        style.name === "heading/h1"
          ? {
              ...style,
              variables: { ...style.variables, fontFamily: heading.name },
            }
          : style,
      ),
      variables: [...theme.variables, heading],
    })
    const variable = fake.variables.find(({ name }) => name === heading.name)!
    expect(
      fake.textStyles.find(({ name }) => name === "heading/h1")!.boundVariables
        .fontFamily,
    ).toEqual({ id: variable.id, type: "VARIABLE_ALIAS" })
  })

  test("falls back to the nearest weight and to Inter", async () => {
    const fake = fakeFigma({ fonts: [["Inter", ["Regular", "Bold"]]] })
    await runSync(fake.figma, theme)
    expect(
      fake.textStyles.find(({ name }) => name === "overline")!.fontName,
    ).toEqual({ family: "Inter", style: "Regular" })
    expect(
      fake.textStyles.find(({ name }) => name === "code")!.fontName.family,
    ).toBe("Inter")
    expect(
      Object.values(
        fake.variables.find(({ name }) => name === "typography/ui-font-code")!
          .valuesByMode,
      ),
    ).toEqual(["Inter", "Inter", "Inter", "Inter"])
  })

  test("syncs only the modes and parts it is asked for", async () => {
    const fake = fakeFigma()
    const report = await runSync(fake.figma, theme, {
      effects: false,
      modes: ["light"],
      text: false,
    })
    expect(fake.collections[0].modes.map(({ name }) => name)).toEqual(["Light"])
    expect(fake.effectStyles).toEqual([])
    expect(fake.textStyles).toEqual([])
    expect(fake.variables.some(({ name }) => name.startsWith("effects/"))).toBe(
      false,
    )
    expect(report.collections).toHaveLength(1)
  })

  test("skips the motion variables in a file without their types", async () => {
    const fake = fakeFigma({ types: ["COLOR", "FLOAT", "STRING"] })
    const report = await runSync(fake.figma, theme)
    expect(
      report.warnings.filter((warning) => warning.includes("TIMING")),
    ).toHaveLength(3)
    expect(
      fake.variables.some(({ resolvedType }) => resolvedType === "TIMING"),
    ).toBe(false)
  })

  test("writes motion as timing and cubic bezier easing", async () => {
    const fake = fakeFigma()
    await runSync(fake.figma, theme)
    const ease = fake.variables.find(({ name }) => name === "motion/ui-ease")!
    expect(Object.values(ease.valuesByMode)[0]).toEqual({
      easingFunctionCubicBezier: { x1: 0.25, x2: 0.25, y1: 0.1, y2: 1 },
      type: "CUSTOM_CUBIC_BEZIER",
    })
  })

  test("uses no syntax newer than ES2017, so the Figma sandbox runs it", () => {
    const source = ts.createSourceFile(
      "sync.js",
      SYNC_SOURCE,
      ts.ScriptTarget.Latest,
      true,
    )
    const newer: string[] = []
    const visit = (node: ts.Node) => {
      if (
        ts.isSpreadAssignment(node) ||
        node.kind === ts.SyntaxKind.QuestionDotToken ||
        (ts.isBinaryExpression(node) &&
          [
            ts.SyntaxKind.QuestionQuestionToken,
            ts.SyntaxKind.QuestionQuestionEqualsToken,
            ts.SyntaxKind.AmpersandAmpersandEqualsToken,
            ts.SyntaxKind.BarBarEqualsToken,
          ].includes(node.operatorToken.kind)) ||
        (ts.isCatchClause(node) && !node.variableDeclaration) ||
        ts.isPrivateIdentifier(node) ||
        node.kind === ts.SyntaxKind.BigIntLiteral
      ) {
        newer.push(node.getText(source).slice(0, 40))
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
    expect(newer).toEqual([])
  })
})
