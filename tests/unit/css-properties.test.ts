import { readFileSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"
import {
  declaredProperties,
  stripComments,
} from "../../src/utils/package-source"
import { themeTokens } from "../../src/utils/theme-tokens"

const sheets = [
  ...readdirSync("packages/opui/css/components").map(
    (file) => `packages/opui/css/components/${file}`,
  ),
  ...readdirSync("packages/opui/core").map(
    (file) => `packages/opui/core/${file}`,
  ),
  "packages/opui/css/theme.css",
].filter((file) => file.endsWith(".css"))

const components = [
  ...readdirSync("packages/opui/css/components").map((file) =>
    file.replace(/\.css$/, ""),
  ),
  "field",
  "rich-text",
]

const sources = sheets.map((file) => stripComments(readFileSync(file, "utf8")))

const names = new Set(
  sources.flatMap((source) =>
    declaredProperties(source).filter((name) =>
      /^--(?:_|ui-)[a-z0-9-]+$/.test(name),
    ),
  ),
)

const tokens = new Set([
  ...themeTokens().map((token) => token.name),
  ...sources.flatMap((source) => source.match(/--ui-[a-z0-9-]+/g) ?? []),
])

const ON_FILL = /^--ui-((?:[a-z]+-)?)on-([a-z0-9-]+)$/
const ON_FILL_EXCEPTION = "--ui-on-fill"
const tokenProblem = (name: string, known: Set<string>) => {
  if (/-on-(filled|raised)$/.test(name)) {
    return "no token restates another for a surface: make the base token work on every surface, translucent where it has to be (--ui-border-color)"
  }
  if (name !== "--ui-contrast" && /-contrast(-|$)/.test(name)) {
    return "never -contrast, which only names the contrast mode (--ui-contrast): the color on a fill is --ui-on-{fill}"
  }
  const [, family, fill] = name.match(ON_FILL) ?? []
  if (!fill || name === ON_FILL_EXCEPTION) {
    return undefined
  }
  const fills = [`--ui-${family}${fill}`, `--ui-${family}surface-${fill}`]
  if (!fills.some((token) => known.has(token))) {
    return `an --ui-on-{fill} token needs ${fills.join(" or ")} to sit on. The one exception is ${ON_FILL_EXCEPTION}, the text on every intent fill (--ui-critical-fill, --ui-info-fill, --ui-neutral-fill and --ui-success-fill), which has no token of its own because it sits on four`
  }
}

const problem = (name: string) => {
  if (
    /(^--_|-)(height|width)(-|$)/.test(name) &&
    !/(^--_|-)(border|outline)-width$/.test(name) &&
    !/(^--_|-)line-height$/.test(name)
  ) {
    return "use -block-size or -inline-size"
  }
  if (/(^--_|-)(border|outline)-size$/.test(name)) {
    return "a border or outline thickness is -width"
  }
  if (/(^--_|-)space(-|$)/.test(name)) return "use -gap or -padding"
  if (/(^--_|-)(tx|ty)$/.test(name)) return "use -shift-x or -shift-y"
  if (/(^--_|-)dir$/.test(name)) return "use -direction"
  if (/(^--_|-)border-radius$/.test(name)) return "use -radius"
  if (name === "--_input-size") return "a control's size is --_size"
  if (
    /(^--_|-)color$/.test(name) &&
    !/(^--_|-)(bg|text|border|outline)-color$/.test(name)
  ) {
    return "say what the color paints: -bg-color, -text-color or -border-color"
  }
  if (
    name.startsWith("--ui-") &&
    !SUFFIX.test(name.replace(/-(x-small|small|large|filled)$/, ""))
  ) {
    return "end in the property it sets, a value type, -accent, -strength or -lightness"
  }
}

const SUFFIX =
  /-(bg-color|text-color|border-color|size|radius|gap|shadow|(margin|padding)(-(block|inline)(-start|-end)?)?|font-size|font-weight|line-height|position-area|blur|offset|translate|hover|focus|checked|border-width|accent|on-accent|strength|lightness)$/

test.each([
  ["--_height", "use -block-size or -inline-size"],
  ["--_icon-width", "use -block-size or -inline-size"],
  ["--_thumb-outline-size", "a border or outline thickness is -width"],
  ["--_space", "use -gap or -padding"],
  ["--_tx", "use -shift-x or -shift-y"],
  ["--_dir", "use -direction"],
  ["--_border-radius", "use -radius"],
  ["--_input-size", "a control's size is --_size"],
  [
    "--_color",
    "say what the color paints: -bg-color, -text-color or -border-color",
  ],
  [
    "--ui-card-spacing",
    "end in the property it sets, a value type, -accent, -strength or -lightness",
  ],
  [
    "--ui-rich-text-heading-margin-start",
    "end in the property it sets, a value type, -accent, -strength or -lightness",
  ],
])("%s breaks the suffix rules", (name, message) => {
  expect(problem(name)).toBe(message)
})

test.each([
  "--_block-size",
  "--_border-width",
  "--_bg-color",
  "--_gap",
  "--_line-height",
  "--_radius",
  "--_shift-x",
  "--_size",
  "--ui-card-padding",
  "--ui-rich-text-heading-margin-block-start",
])("%s follows the suffix rules", (name) => {
  expect(problem(name)).toBeUndefined()
})

test("private and component custom properties follow the suffix rules", () => {
  const checked = [
    ...new Set([...names, ...themeTokens().map((token) => token.name)]),
  ].filter(
    (name) =>
      name.startsWith("--_") ||
      components.some((component) => name.startsWith(`--ui-${component}-`)),
  )
  expect(checked.length).toBeGreaterThan(100)
  expect(checked).toContain("--ui-rich-text-flow-gap")
  expect(
    checked
      .map((name) => [name, problem(name)])
      .filter(([, message]) => message)
      .map(([name, message]) => `${name}: ${message}`)
      .toSorted(),
  ).toEqual([])
})

test("tokens never end in -contrast, and every --ui-on-{fill} has a fill to sit on", () => {
  const checked = [...new Set([...names, ...tokens])].filter((name) =>
    /^--(?:_|ui-)[a-z0-9-]+$/.test(name),
  )
  expect(checked.filter((name) => ON_FILL.test(name)).length).toBeGreaterThan(
    10,
  )
  expect(
    checked
      .map((name) => [name, tokenProblem(name, tokens)])
      .filter(([, message]) => message)
      .map(([name, message]) => `${name}: ${message}`)
      .toSorted(),
  ).toEqual([])
})

test("the token rules catch -contrast and an on-color without a fill", () => {
  const known = new Set([
    "--ui-brand",
    "--ui-palette-tonal",
    "--ui-surface-inverse",
  ])
  expect(
    [
      "--ui-contrast",
      "--ui-on-brand",
      "--ui-on-fill",
      "--ui-on-inverse",
      "--ui-palette-on-tonal",
    ].map((name) => tokenProblem(name, known)),
  ).toEqual([undefined, undefined, undefined, undefined, undefined])
  expect(
    [
      "--ui-brand-contrast",
      "--_accent-contrast",
      "--ui-on-tonal",
      "--ui-border-color-on-raised",
      "--ui-field-border-color-on-filled",
    ].map((name) => tokenProblem(name, known)),
  ).toEqual([
    expect.stringContaining("never -contrast"),
    expect.stringContaining("never -contrast"),
    expect.stringContaining("needs --ui-tonal or --ui-surface-tonal"),
    expect.stringContaining("no token restates another for a surface"),
    expect.stringContaining("no token restates another for a surface"),
  ])
})

const vocabularyProblem = (name: string) => {
  if (!name.startsWith("--ui-")) return undefined
  if (
    /^--ui-font-weight-(normal|medium|semibold|bold|light|black|\d+)$/.test(
      name,
    )
  ) {
    return "name a weight by the role it styles (--ui-font-weight-label), so a theme that sets it can't make a name lie"
  }
  if (
    /^--ui-line-height(-|$)/.test(name) &&
    !/^--ui-line-height-(body|compact|tight)$/.test(name)
  ) {
    return "the line heights are --ui-line-height-tight, -compact and -body, by how much room the text gets: a theme sets one of the three, and a part that needs its own gets a component token (--ui-field-helper-line-height)"
  }
  if (/^--ui-font-(body|code|heading)$/.test(name)) {
    return "a font family is --ui-font-family-*, so it doesn't read like --ui-font-size-*"
  }
  const words = name.slice("--ui-".length).split("-")
  if (words.includes("elevated") && name !== "--ui-shadow-elevated") {
    return "elevated only names the variant (--ui-shadow-elevated): a surface above the page is raised"
  }
  const synonym = words.find((word) =>
    ["hovered", "press", "pressed", "tint"].includes(word),
  )
  if (synonym) {
    return `${synonym} is a synonym: one word per concept, so tonal, not tint; active, not press or pressed; hover, not hovered`
  }
  if (
    words.some((word) =>
      ["active", "disabled", "hover", "selected"].includes(word),
    ) &&
    /-(alpha-[a-z]+|opacity|scale)$/.test(name) &&
    !name.startsWith("--ui-state-")
  ) {
    return "a knob that tunes a state across components lives under --ui-state-, and a role takes its state as a suffix"
  }
  return undefined
}

test("tokens use one word per concept", () => {
  const checked = [...new Set([...names, ...tokens])]
  expect(
    checked.filter((name) => name.startsWith("--ui-state-")).length,
  ).toBeGreaterThan(5)
  expect(
    checked
      .map((name) => [name, vocabularyProblem(name)])
      .filter(([, message]) => message)
      .map(([name, message]) => `${name}: ${message}`)
      .toSorted(),
  ).toEqual([])
})

test("samples the vocabulary rule must flag and must keep", () => {
  expect(
    [
      "--ui-surface-elevated",
      "--ui-palette-tint",
      "--ui-press-scale",
      "--ui-button-pressed-bg-color",
      "--ui-disabled-opacity",
      "--ui-hover-alpha-light",
      "--ui-font-weight-bold",
      "--ui-line-height",
      "--ui-line-height-control",
      "--ui-font-body",
    ].map((name) => vocabularyProblem(name) === undefined),
  ).toEqual(Array(10).fill(false))
  expect(
    [
      "--ui-shadow-elevated",
      "--ui-surface-raised",
      "--ui-palette-tonal",
      "--ui-state-active-scale",
      "--ui-state-disabled-opacity",
      "--ui-text-disabled",
      "--ui-text-disabled-strength",
      "--ui-surface-tonal-hover",
      "--ui-underline-hover-thickness",
      "--_elevated-shadow",
      "--ui-font-weight-label",
      "--ui-line-height-body",
      "--ui-line-height-compact",
      "--ui-field-helper-line-height",
      "--ui-font-family-body",
    ].map(vocabularyProblem),
  ).toEqual(Array(15).fill(undefined))
})

const STATE_ENDING = /-(checked|focus|hover)$/

const stateEndingProblem = ({ name, value }: { name: string; value: string }) =>
  STATE_ENDING.test(name) &&
  !/^[a-z-]+$/.test(value.trim()) &&
  !/\b(color|color-mix|light-dark|oklch)\(/.test(value)
    ? `${name} ends in a state but holds ${value}: a length or a number ends in the property it sets, after the state (--ui-underline-hover-thickness), and only a keyword switch (--ui-button-hover: shade) or a color ends in the state (--ui-surface-tonal-hover)`
    : undefined

test("a token that ends in a state holds a keyword or a color", () => {
  const ending = themeTokens().filter((token) => STATE_ENDING.test(token.name))
  expect(ending.length).toBeGreaterThan(3)
  expect(ending.map(stateEndingProblem).filter(Boolean)).toEqual([])
})

test("a sample the state ending rule must flag: a length after the state", () => {
  expect(
    stateEndingProblem({
      name: "--ui-underline-thickness-hover",
      value: "3px",
    }),
  ).toContain("ends in a state but holds 3px")
  expect(
    stateEndingProblem({ name: "--ui-button-hover", value: "shade" }),
  ).toBeUndefined()
})

const spaceStepProblem = (name: string, value: string) => {
  const step = Number(name.replace(/^--ui-space-/, "").replace("-", "."))
  const rem = value.match(/^calc\(([\d.]+)rem \* var\(--ui-space-scale\)\)$/)
  if (!rem)
    return `${name} is ${value}: write calc(<rem> * var(--ui-space-scale))`
  return Number(rem[1]) * 4 === step
    ? undefined
    : `${name} is ${rem[1]}rem: a step's number is its size in quarter rems (--ui-space-${String(Number(rem[1]) * 4).replace(".", "-")}), so a step can be added without renaming another`
}

test("each space step is named by its size in quarter rems", () => {
  const steps = themeTokens().filter((token) =>
    /^--ui-space-\d+(-\d+)?$/.test(token.name),
  )
  expect(steps.length).toBeGreaterThan(5)
  expect(
    steps
      .map((token) => spaceStepProblem(token.name, token.value.trim()))
      .filter(Boolean),
  ).toEqual([])
})

test("samples the space step rule must flag and must keep", () => {
  expect(
    spaceStepProblem("--ui-space-3", "calc(1rem * var(--ui-space-scale))"),
  ).toContain("(--ui-space-4)")
  expect(spaceStepProblem("--ui-space-4", "1rem")).toContain("write calc(")
  expect(
    [
      ["--ui-space-3", "calc(0.75rem * var(--ui-space-scale))"],
      ["--ui-space-0-5", "calc(0.125rem * var(--ui-space-scale))"],
      ["--ui-space-12", "calc(3rem * var(--ui-space-scale))"],
    ].map(([name, value]) => spaceStepProblem(name, value)),
  ).toEqual([undefined, undefined, undefined])
})

const ACCENT_GUARDS = [
  "--ui-control-accent-max-chroma-dark",
  "--ui-control-accent-min-lightness-dark",
]

const limitProblem = (name: string) =>
  name.startsWith("--ui-") &&
  /-(max|min)-(chroma|lightness)(-dark|-light)?$/.test(name) &&
  !ACCENT_GUARDS.includes(name)
    ? `${name} is a limit of the contrast engine: name it --_ui-${name.slice("--ui-".length)}, private to theme.css, and give components a role that holds the limited color`
    : undefined

test("the contrast engine's limits are private, but for the two accent guards", () => {
  const names = themeTokens().map((token) => token.name)
  expect(names).toEqual(expect.arrayContaining(ACCENT_GUARDS))
  expect(names.map(limitProblem).filter(Boolean)).toEqual([])
})

test("samples the limit rule must flag and must keep", () => {
  expect(limitProblem("--ui-text-max-lightness")).toContain(
    "--_ui-text-max-lightness",
  )
  expect(limitProblem("--ui-primary-min-lightness-dark")).toBeDefined()
  expect(
    [
      ...ACCENT_GUARDS,
      "--_ui-text-max-lightness",
      "--ui-fluid-max-inline-size",
    ].map(limitProblem),
  ).toEqual([undefined, undefined, undefined, undefined])
})
