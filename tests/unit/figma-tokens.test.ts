import { readdirSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import type { FigmaProbe } from "../../src/utils/figma-probe"
import {
  figmaColor,
  figmaFont,
  figmaFonts,
  figmaJson,
  figmaModeFiles,
  figmaProbeRequest,
  figmaTheme,
  figmaTokenMeta,
  splitTopLevel,
  staleProbe,
  type TokensJson,
} from "../../src/utils/figma-tokens"

const token = (
  type: string | undefined,
  cssVar: string,
  tier: string,
  value?: string,
  modes?: Record<string, string>,
) => ({
  $description: `${cssVar} description.`,
  $extensions: { opui: { cssVar, ...(modes && { modes }), tier } },
  ...(type && { $type: type }),
  ...(value !== undefined && { $value: value }),
})

const TOKENS: TokensJson = {
  elevation: {
    "ui-shadow-control": token("shadow", "--ui-shadow-control", "role", "none"),
    "ui-shadow-elevated": token("shadow", "--ui-shadow-elevated", "role", ""),
  },
  motion: {
    "ui-duration": token("duration", "--ui-duration", "role", "0.2s"),
    "ui-ease": token("cubicBezier", "--ui-ease", "role", "ease"),
  },
  palette: {
    "ui-palette-hue": token("number", "--ui-palette-hue", "knob", "250"),
  },
  "palette-steps": {
    "ui-color-1": token("color", "--ui-color-1", "primitive", ""),
    "ui-color-2": token("color", "--ui-color-2", "primitive", ""),
  },
  surfaces: {
    "ui-surface": token(
      "color",
      "--ui-surface",
      "role",
      "{palette-steps.ui-color-1}",
      { dark: "var(--ui-color-2)" },
    ),
    "ui-text": token("color", "--ui-text", "role", "light-dark(red, blue)"),
  },
  typography: {
    "ui-font-body": token("fontFamily", "--ui-font-body", "role", "system-ui"),
    "ui-font-size-body": token(
      "dimension",
      "--ui-font-size-body",
      "role",
      "1rem",
    ),
    "ui-font-weight-bold": token(
      "fontWeight",
      "--ui-font-weight-bold",
      "role",
      "700",
    ),
    "ui-letter-spacing-caps": token(
      "dimension",
      "--ui-letter-spacing-caps",
      "role",
      "0.06em",
    ),
    "ui-line-height": token("number", "--ui-line-height", "role", "1.6"),
    "ui-radius": token("dimension", "--ui-radius", "role", "0.5rem"),
  },
}

const text = (fontSize: string, fontWeight = "400") => ({
  fontFamily: '"Geist", system-ui, sans-serif',
  fontSize,
  fontWeight,
  letterSpacing: "normal",
  lineHeight: "24px",
  textTransform: "none",
})

const PROBE: FigmaProbe = {
  dark: {
    relative: ["--ui-letter-spacing-caps"],
    text: {},
    tokens: {
      "--ui-color-1": "oklch(0.98 0.01 255)",
      "--ui-color-2": "oklch(0.2 0.01 255)",
      "--ui-duration": "0.2s",
      "--ui-ease": "cubic-bezier(0.2, 0, 0, 1)",
      "--ui-font-body": '"Geist", system-ui, sans-serif',
      "--ui-font-size-body": "16px",
      "--ui-font-weight-bold": "700",
      "--ui-letter-spacing-caps": "0.96px",
      "--ui-line-height": "1.6",
      "--ui-radius": "8px",
      "--ui-shadow-control": "none",
      "--ui-shadow-elevated": "oklch(0.1 0.01 259 / 0.4) 0px 2px 6px 0px",
      "--ui-surface": "oklch(0.2 0.01 255)",
      "--ui-text": "oklch(0.9 0 0)",
    },
  },
  light: {
    relative: ["--ui-letter-spacing-caps"],
    text: {
      "body/default": text("16px"),
      "heading/h1": {
        ...text("56px", "700"),
        letterSpacing: "-1.12px",
        lineHeight: "64px",
      },
      overline: { ...text("12px", "500"), textTransform: "uppercase" },
    },
    tokens: {
      "--ui-color-1": "oklch(0.98 0.01 255)",
      "--ui-color-2": "oklch(0.2 0.01 255)",
      "--ui-duration": "0.2s",
      "--ui-ease": "cubic-bezier(0.2, 0, 0, 1)",
      "--ui-font-body": '"Geist", system-ui, sans-serif',
      "--ui-font-size-body": "16px",
      "--ui-font-weight-bold": "700",
      "--ui-letter-spacing-caps": "0.96px",
      "--ui-line-height": "1.6",
      "--ui-radius": "8px",
      "--ui-shadow-control": "none",
      "--ui-shadow-elevated":
        "oklch(0.27 0 265 / 0.06) 0px 1px 2px 0px, oklch(0.27 0 265 / 0.04) 0px 4px 12px -2px",
      "--ui-surface": "oklch(0.98 0.01 255)",
      "--ui-text": "oklch(0.3 0 0)",
    },
  },
}

const theme = figmaTheme(TOKENS, PROBE, "opui")
const variable = (name: string) =>
  theme.variables.find((entry) => entry.name === name)

describe("figmaTokenMeta", () => {
  test("reads each token's alias in every mode", () => {
    const surface = figmaTokenMeta(TOKENS).find(
      (entry) => entry.cssVar === "--ui-surface",
    )
    expect(surface).toMatchObject({
      aliases: {
        dark: "--ui-color-2",
        "dark-more-contrast": "--ui-color-2",
        light: "--ui-color-1",
        "light-more-contrast": "--ui-color-1",
      },
      name: "surfaces/ui-surface",
      path: "surfaces.ui-surface",
      tier: "role",
    })
  })

  test("gives a token without a plain var() no alias", () => {
    const textToken = figmaTokenMeta(TOKENS).find(
      (entry) => entry.cssVar === "--ui-text",
    )
    expect(textToken?.aliases.light).toBe("")
  })
})

describe("figmaProbeRequest", () => {
  test("probes every typed token but the knobs, in four modes", () => {
    const request = figmaProbeRequest(figmaTokenMeta(TOKENS))
    const names = request.tokens.map(({ name }) => name)
    expect(names).toContain("--ui-shadow-elevated")
    expect(names).not.toContain("--ui-palette-hue")
    expect(request.modes.map(({ id }) => id)).toEqual([
      "light",
      "dark",
      "light-more-contrast",
      "dark-more-contrast",
    ])
    expect(request.text.map(({ name }) => name)).toContain("heading/h1")
  })
})

describe("figmaTheme", () => {
  test("keeps the modes the probe resolved", () => {
    expect(theme.modes).toEqual([
      { id: "light", name: "Light" },
      { id: "dark", name: "Dark" },
    ])
    expect(theme.collection).toBe("opui")
  })

  test("writes an alias where the target resolves to the same value", () => {
    expect(variable("surfaces/ui-surface")?.values).toEqual({
      dark: { alias: "palette-steps/ui-color-2" },
      light: { alias: "palette-steps/ui-color-1" },
    })
  })

  test("writes the resolved color where there is no alias", () => {
    expect(variable("surfaces/ui-text")?.values.light).toEqual(
      figmaColor("oklch(0.3 0 0)"),
    )
  })

  test("hides the primitives from publishing and from every picker", () => {
    expect(variable("palette-steps/ui-color-1")).toMatchObject({
      hidden: true,
      scopes: [],
    })
  })

  test("scopes each role to the properties it belongs to", () => {
    expect(variable("surfaces/ui-surface")?.scopes).toEqual([
      "FRAME_FILL",
      "SHAPE_FILL",
    ])
    expect(variable("surfaces/ui-text")?.scopes).toEqual(["TEXT_FILL"])
    expect(variable("typography/ui-radius")).toMatchObject({
      scopes: ["CORNER_RADIUS"],
      type: "FLOAT",
      values: { light: 8 },
    })
    expect(variable("typography/ui-font-weight-bold")?.scopes).toEqual([
      "FONT_WEIGHT",
    ])
  })

  test("keeps a length that scales with the font size out of the pickers", () => {
    const caps = variable("typography/ui-letter-spacing-caps")
    expect(caps?.scopes).toEqual([])
    expect(caps?.description).toContain("Scales with the font size")
  })

  test("writes code syntax for every token", () => {
    expect(variable("typography/ui-radius")?.codeSyntax).toBe(
      "var(--ui-radius)",
    )
  })

  test("picks a Figma font from the stack", () => {
    expect(variable("typography/ui-font-body")).toMatchObject({
      fonts: ["Geist", "Inter"],
      scopes: ["FONT_FAMILY"],
      type: "STRING",
      values: { light: "Geist" },
    })
  })

  test("writes motion as timing and easing", () => {
    expect(variable("motion/ui-duration")).toMatchObject({
      type: "TIMING",
      values: { light: 0.2 },
    })
    expect(variable("motion/ui-ease")).toMatchObject({
      type: "EASING",
      values: { light: { bezier: [0.2, 0, 0, 1] } },
    })
  })

  test("leaves out the knobs", () => {
    expect(variable("palette/ui-palette-hue")).toBeUndefined()
  })

  test("turns each shadow into an effect with per-mode layer variables", () => {
    expect(theme.effects.map(({ name }) => name)).toEqual([
      "elevation/ui-shadow-elevated",
    ])
    const [first, second] = theme.effects[0].layers
    expect(first).toEqual({
      blur: "effects/ui-shadow-elevated/1/blur",
      color: "effects/ui-shadow-elevated/1/color",
      inset: false,
      spread: 0,
      x: 0,
      y: "effects/ui-shadow-elevated/1/y",
    })
    expect(second.spread).toBe(-2)
    expect(variable("effects/ui-shadow-elevated/1/y")?.values).toEqual({
      dark: 2,
      light: 1,
    })
    expect(variable("effects/ui-shadow-elevated/2/color")).toMatchObject({
      helper: true,
      hidden: true,
      scopes: ["EFFECT_COLOR"],
      values: { dark: { alpha: 0 } },
    })
  })

  test("writes text styles and binds the variables that match", () => {
    const heading = theme.text.find(({ name }) => name === "heading/h1")
    expect(heading).toEqual({
      description: ".ui-h1",
      fontSize: 56,
      fontWeight: 700,
      fonts: ["Geist", "Inter"],
      letterSpacing: -1.12,
      lineHeight: 64,
      name: "heading/h1",
      textCase: "ORIGINAL",
      variables: {
        fontFamily: "typography/ui-font-body",
        fontSize: undefined,
        fontWeight: "typography/ui-font-weight-bold",
      },
    })
    expect(
      theme.text.find(({ name }) => name === "body/default")?.variables
        .fontSize,
    ).toBe("typography/ui-font-size-body")
    expect(theme.text.find(({ name }) => name === "overline")?.textCase).toBe(
      "UPPER",
    )
  })
})

describe("figmaModeFiles", () => {
  const files = figmaModeFiles(theme)

  test("writes one DTCG file per mode", () => {
    expect(Object.keys(files)).toEqual(["light", "dark"])
  })

  test("writes aliases as references and colors in sRGB with a hex fallback", () => {
    expect(files.light.surfaces["ui-surface"]).toMatchObject({
      $type: "color",
      $value: "{palette-steps.ui-color-1}",
    })
    expect(files.light.surfaces["ui-text"]).toMatchObject({
      $extensions: {
        "com.figma": {
          codeSyntax: { WEB: "var(--ui-text)" },
          scopes: ["TEXT_FILL"],
        },
        opui: { oklch: [0.3, 0, 0] },
      },
      $value: {
        alpha: 1,
        colorSpace: "srgb",
        components: figmaColor("oklch(0.3 0 0)")?.srgb,
        hex: figmaColor("oklch(0.3 0 0)")?.hex,
      },
    })
  })

  test("marks the primitives hidden from publishing", () => {
    expect(files.dark["palette-steps"]["ui-color-2"]).toMatchObject({
      $extensions: { "com.figma": { hiddenFromPublishing: true, scopes: [] } },
    })
  })

  test("leaves out the shadow layers and motion", () => {
    expect(files.light.effects).toBeUndefined()
    expect(files.light.motion).toBeUndefined()
  })
})

describe("figmaFonts", () => {
  test("puts a Figma font in place of each generic family", () => {
    expect(figmaFonts("ui-monospace, 'Cascadia Code', monospace")).toEqual([
      "Roboto Mono",
      "Cascadia Code",
    ])
    expect(figmaFonts("Georgia, serif")).toEqual(["Georgia", "Noto Serif"])
  })
})

describe("figmaFont", () => {
  test("takes the first family Figma ships, or the Figma font for a generic family", () => {
    expect(
      figmaFont('"Dank Mono", "Operator Mono", Inconsolata, monospace'),
    ).toBe("Inconsolata")
    expect(figmaFont("system-ui, Geist, sans-serif")).toBe("Inter")
    expect(figmaFont("Geist, system-ui, sans-serif")).toBe("Geist")
    expect(figmaFont('"My Brand Font"')).toBe("Inter")
  })
})

describe("figmaColor", () => {
  test("keeps the oklch value next to the sRGB and Display P3 ones", () => {
    expect(figmaColor("oklch(0.65 0.25 30 / 0.5)")).toMatchObject({
      alpha: 0.5,
      oklch: [0.65, 0.25, 30],
    })
    expect(figmaColor("rgb(0 0 0)")).toBeUndefined()
  })
})

describe("splitTopLevel", () => {
  test("splits outside parentheses only", () => {
    expect(
      splitTopLevel(
        "oklch(0.1 0 0 / 0.2) 0px 1px, oklch(0.2 0 0) 0px 2px",
        ",",
      ),
    ).toEqual(["oklch(0.1 0 0 / 0.2) 0px 1px", "oklch(0.2 0 0) 0px 2px"])
  })
})

describe("figmaJson", () => {
  test("writes arrays of numbers and strings on one line", () => {
    expect(
      figmaJson({
        components: [0.1, 0.2, 0.3],
        fonts: ["Inter", "a, b"],
        nested: [{ a: 1 }],
      }),
    ).toBe(
      '{\n  "components": [0.1, 0.2, 0.3],\n  "fonts": ["Inter", "a, b"],\n  "nested": [\n    {\n      "a": 1\n    }\n  ]\n}\n',
    )
  })
})

describe("staleProbe", () => {
  const request = figmaProbeRequest(figmaTokenMeta(TOKENS))

  test("lists the tokens a probe lacks or has too many of", () => {
    const light = {
      relative: [],
      text: {},
      tokens: {
        ...Object.fromEntries(request.tokens.map(({ name }) => [name, ""])),
        "--ui-gone": "1px",
      } as Record<string, string>,
    }
    delete light.tokens["--ui-radius"]
    expect(staleProbe(request, { light })).toEqual(
      expect.arrayContaining([
        "light: --ui-radius is missing",
        "light: --ui-gone is not in tokens.json",
        "dark: --ui-radius is missing",
      ]),
    )
  })

  test("the recorded probes cover every token tokens.json exports", () => {
    const current = figmaProbeRequest(
      figmaTokenMeta(
        JSON.parse(readFileSync("packages/opui/tokens.json", "utf8")),
      ),
    )
    const stale = readdirSync("src/figma").flatMap((file) =>
      staleProbe(
        current,
        JSON.parse(readFileSync(`src/figma/${file}`, "utf8")),
      ).map((problem) => `${file} ${problem}`),
    )
    expect(
      stale,
      "Run pnpm test:e2e:record-figma and commit src/figma.",
    ).toEqual([])
  })
})
