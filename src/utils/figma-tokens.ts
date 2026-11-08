import { oklchToRgb, parseOklch, rgbToHex } from "./color-utils"
import type { FigmaProbe, FigmaProbeRequest } from "./figma-probe"
import { WEB_FONTS } from "./theme-fonts"

type TokenJson = {
  $description?: string
  $extensions?: {
    opui?: {
      css?: string
      cssVar?: string
      modes?: Record<string, string>
      tier?: string
    }
  }
  $type?: string
  $value?: unknown
}

export type TokensJson = Record<string, Record<string, TokenJson>>

export const FIGMA_MODES = [
  { classes: ["ui-light"], id: "light", name: "Light" },
  { classes: ["ui-dark"], id: "dark", name: "Dark" },
  {
    classes: ["ui-light", "ui-contrast-more"],
    id: "light-more-contrast",
    name: "Light more contrast",
  },
  {
    classes: ["ui-dark", "ui-contrast-more"],
    id: "dark-more-contrast",
    name: "Dark more contrast",
  },
]

const BODY = { fontFamily: ["--ui-font-body"], tag: "p" }

export const FIGMA_TEXT = [
  {
    ...BODY,
    classes: "ui-p",
    fontSize: "--ui-font-size-body",
    fontWeight: "--ui-font-weight-normal",
    name: "body/default",
  },
  {
    ...BODY,
    classes: "ui-p ui-large",
    fontSize: "--ui-font-size-large",
    fontWeight: "--ui-font-weight-normal",
    name: "body/large",
  },
  {
    ...BODY,
    classes: "ui-p ui-small",
    fontSize: "--ui-font-size-small",
    fontWeight: "--ui-font-weight-normal",
    name: "body/small",
  },
  {
    ...BODY,
    classes: "ui-caption",
    fontSize: "--ui-font-size-caption",
    fontWeight: "--ui-font-weight-normal",
    name: "caption",
  },
  {
    classes: "ui-code-block",
    fontFamily: ["--ui-font-code"],
    fontSize: "--ui-font-size-small",
    fontWeight: "--ui-font-weight-normal",
    name: "code",
    tag: "pre",
  },
  ...[1, 2, 3, 4, 5, 6].map((level) => ({
    classes: `ui-h${level}`,
    fontFamily: ["--ui-font-heading", "--ui-font-body"],
    fontSize: `--ui-font-size-h${level}`,
    fontWeight: "--ui-font-weight-bold",
    name: `heading/h${level}`,
    tag: `h${level}`,
  })),
  {
    ...BODY,
    classes: "ui-overline",
    fontSize: "--ui-font-size-caption",
    fontWeight: "--ui-font-weight-medium",
    name: "overline",
  },
]

export type FigmaColor = {
  alpha: number
  hex: string
  oklch: number[]
  p3: number[]
  srgb: number[]
}

export type FigmaValue =
  | FigmaColor
  | number
  | string
  | { alias: string }
  | { bezier: number[] }

export type FigmaVariableType =
  | "COLOR"
  | "EASING"
  | "FLOAT"
  | "STRING"
  | "TIMING"

export type FigmaVariable = {
  codeSyntax?: string
  description: string
  fonts?: string[]
  helper?: boolean
  hidden: boolean
  name: string
  scopes: string[]
  type: FigmaVariableType
  values: Record<string, FigmaValue>
}

export type FigmaEffectLayer = {
  blur: number | string
  color: string
  inset: boolean
  spread: number | string
  x: number | string
  y: number | string
}

export type FigmaEffect = {
  description: string
  layers: FigmaEffectLayer[]
  name: string
}

export type FigmaTextStyle = {
  description: string
  fontSize: number
  fontWeight: number
  fonts: string[]
  letterSpacing: number
  lineHeight?: number
  name: string
  textCase: "ORIGINAL" | "UPPER"
  variables: { fontFamily?: string; fontSize?: string; fontWeight?: string }
}

export type FigmaTheme = {
  collection: string
  effects: FigmaEffect[]
  modes: { id: string; name: string }[]
  text: FigmaTextStyle[]
  variables: FigmaVariable[]
  version: number
}

export type FigmaTokenMeta = {
  aliases: Record<string, string | undefined>
  cssVar: string
  description: string
  name: string
  path: string
  tier: string
  type?: string
}

const ALIAS = /^var\((--ui-[\w-]+)\)$/
const REFERENCE = /^\{([\w-]+)\.([\w-]+)\}$/
const SKIPPED_TIERS = new Set(["input", "knob"])
const TYPES: Record<string, FigmaVariableType> = {
  color: "COLOR",
  cubicBezier: "EASING",
  dimension: "FLOAT",
  duration: "TIMING",
  fontFamily: "STRING",
  fontWeight: "FLOAT",
  number: "FLOAT",
}
const GENERIC_FONTS: Record<string, string> = {
  "-apple-system": "Inter",
  blinkmacsystemfont: "Inter",
  cursive: "Inter",
  emoji: "Inter",
  fangsong: "Noto Serif",
  fantasy: "Inter",
  math: "Noto Serif",
  monospace: "Roboto Mono",
  "sans-serif": "Inter",
  serif: "Noto Serif",
  "system-ui": "Inter",
  "ui-monospace": "Roboto Mono",
  "ui-rounded": "Inter",
  "ui-sans-serif": "Inter",
  "ui-serif": "Noto Serif",
}
const FIGMA_FONTS = new Set(
  [
    ...WEB_FONTS.map(({ family }) => family),
    "Fira Mono",
    "Inconsolata",
    "Noto Sans",
    "Noto Sans Mono",
    "Noto Serif",
    "Roboto Mono",
    "Space Mono",
    "Ubuntu",
    "Ubuntu Mono",
  ].map((family) => family.toLowerCase()),
)
const EASINGS: Record<string, number[]> = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  "ease-out": [0, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
}

const round = (value: number, digits = 5) => +value.toFixed(digits)

export const splitTopLevel = (value: string, separator: string) => {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let index = 0; index < value.length; index++) {
    const char = value[index]
    if (char === "(") depth++
    else if (char === ")") depth--
    else if (char === separator && depth === 0) {
      parts.push(value.slice(start, index).trim())
      start = index + 1
    }
  }
  parts.push(value.slice(start).trim())
  return parts.filter(Boolean)
}

export const figmaColor = (value: string): FigmaColor | undefined => {
  const parsed = parseOklch(value)
  if (!parsed) return undefined
  const srgb = oklchToRgb(parsed)
  return {
    alpha: round(parsed.alpha, 4),
    hex: rgbToHex(srgb),
    oklch: [round(parsed.L, 4), round(parsed.C, 4), round(parsed.H, 2)],
    p3: oklchToRgb(parsed, "p3").map((channel) => round(channel)),
    srgb: srgb.map((channel) => round(channel)),
  }
}

const families = (stack: string) =>
  stack
    .split(",")
    .map((family) => family.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)

export const figmaFonts = (stack: string) => [
  ...new Set(
    families(stack).map(
      (family) => GENERIC_FONTS[family.toLowerCase()] ?? family,
    ),
  ),
]

export const figmaFont = (stack: string) => {
  for (const family of families(stack)) {
    const generic = GENERIC_FONTS[family.toLowerCase()]
    if (generic) return generic
    if (FIGMA_FONTS.has(family.toLowerCase())) return family
  }
  return "Inter"
}

const pixels = (value: string) => {
  const match = value.match(/^(-?[\d.]+(?:e-?\d+)?)px$/)
  return match ? round(Number(match[1]), 4) : undefined
}

const number = (value: string) =>
  /^-?[\d.]+(?:e-?\d+)?$/.test(value) ? round(Number(value), 4) : undefined

const seconds = (value: string) => {
  const match = value.match(/^(-?[\d.]+)(m?s)$/)
  if (!match) return undefined
  return round(Number(match[1]) / (match[2] === "ms" ? 1000 : 1), 4)
}

const bezier = (value: string) => {
  if (EASINGS[value]) return { bezier: EASINGS[value] }
  const match = value.match(/^cubic-bezier\(([^)]+)\)$/)
  if (!match) return undefined
  const points = match[1].split(",").map((point) => Number(point.trim()))
  return points.length === 4 && points.every(Number.isFinite)
    ? { bezier: points }
    : undefined
}

const valueOf = (type: string, value: string): FigmaValue | undefined => {
  if (!value) return undefined
  if (type === "color") return figmaColor(value)
  if (type === "dimension") return pixels(value)
  if (type === "number" || type === "fontWeight") return number(value)
  if (type === "duration") return seconds(value)
  if (type === "cubicBezier") return bezier(value)
  if (type === "fontFamily") return figmaFont(value)
  return undefined
}

const same = (a: FigmaValue | undefined, b: FigmaValue | undefined) => {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 1e-4
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

export const figmaTokenMeta = (tokens: TokensJson): FigmaTokenMeta[] => {
  const cssVars = new Map<string, string>()
  for (const [group, entries] of Object.entries(tokens)) {
    for (const [key, token] of Object.entries(entries)) {
      const cssVar = token.$extensions?.opui?.cssVar
      if (!key.startsWith("$") && cssVar) cssVars.set(`${group}.${key}`, cssVar)
    }
  }
  const aliasOf = (css?: string) =>
    css === undefined ? undefined : (css.match(ALIAS)?.[1] ?? "")
  return Object.entries(tokens).flatMap(([group, entries]) =>
    Object.entries(entries)
      .filter(([key]) => !key.startsWith("$"))
      .map(([key, token]) => {
        const opui = token.$extensions?.opui ?? {}
        const value = typeof token.$value === "string" ? token.$value : ""
        const reference = value.match(REFERENCE)
        const base = reference
          ? cssVars.get(`${reference[1]}.${reference[2]}`)
          : (aliasOf(opui.css) ?? aliasOf(value))
        const dark = aliasOf(opui.modes?.dark)
        const contrast = aliasOf(opui.modes?.["more-contrast"])
        return {
          aliases: {
            dark: dark ?? base,
            "dark-more-contrast": contrast ?? dark ?? base,
            light: base,
            "light-more-contrast": contrast ?? base,
          },
          cssVar: opui.cssVar ?? `--${key}`,
          description: token.$description ?? "",
          name: `${group}/${key}`,
          path: `${group}.${key}`,
          tier: opui.tier ?? "role",
          type: token.$type,
        }
      }),
  )
}

const probed = (token: FigmaTokenMeta) =>
  !SKIPPED_TIERS.has(token.tier) &&
  !!token.type &&
  (token.type in TYPES || token.type === "shadow")

export const figmaProbeRequest = (
  meta: FigmaTokenMeta[],
): FigmaProbeRequest => ({
  modes: FIGMA_MODES.map(({ classes, id }) => ({ classes, id })),
  text: FIGMA_TEXT.map(({ classes, name, tag }) => ({ classes, name, tag })),
  tokens: meta
    .filter(probed)
    .map(({ cssVar, type }) => ({ name: cssVar, type })),
})

export const staleProbe = (request: FigmaProbeRequest, probe: FigmaProbe) => {
  const names = request.tokens.map(({ name }) => name)
  return request.modes.flatMap(({ id }) => {
    const recorded = Object.keys(probe[id]?.tokens ?? {})
    return [
      ...names
        .filter((name) => !recorded.includes(name))
        .map((name) => `${id}: ${name} is missing`),
      ...recorded
        .filter((name) => !names.includes(name))
        .map((name) => `${id}: ${name} is not in tokens.json`),
    ]
  })
}

const scopesFor = (token: FigmaTokenMeta, relative: boolean) => {
  const name = token.cssVar.replace(/^--ui-/, "")
  if (token.tier === "primitive" || relative) return []
  if (token.type === "color") {
    if (/(^|-)on-/.test(name)) {
      return ["SHAPE_FILL", "STROKE_COLOR", "TEXT_FILL"]
    }
    if (/(^|-)text(-|$)/.test(name)) return ["TEXT_FILL"]
    if (/border|ring/.test(name)) return ["STROKE_COLOR"]
    if (/surface|-bg-color|backdrop|track|thumb|tint/.test(name)) {
      return ["FRAME_FILL", "SHAPE_FILL"]
    }
    return ["FRAME_FILL", "SHAPE_FILL", "STROKE_COLOR"]
  }
  if (token.type === "dimension") {
    if (/radius/.test(name)) return ["CORNER_RADIUS"]
    if (/font-size/.test(name)) return ["FONT_SIZE"]
    if (/border-width|ring-width|thickness/.test(name)) return ["STROKE_FLOAT"]
    if (/blur/.test(name)) return ["EFFECT_FLOAT"]
    if (/gap|margin|padding|rhythm|space/.test(name)) return ["GAP"]
    if (/size/.test(name)) return ["WIDTH_HEIGHT"]
    return []
  }
  if (token.type === "fontWeight") return ["FONT_WEIGHT"]
  if (token.type === "fontFamily") return ["FONT_FAMILY"]
  return []
}

const parseShadow = (value: string) =>
  !value || value === "none"
    ? []
    : splitTopLevel(value, ",").map((layer) => {
        const parts = splitTopLevel(layer, " ")
        const color = parts.find((part) => part.includes("(")) ?? ""
        const lengths = parts
          .filter((part) => part !== color && part !== "inset")
          .map((part) => pixels(part) ?? 0)
        return {
          blur: lengths[2] ?? 0,
          color,
          inset: parts.includes("inset"),
          spread: lengths[3] ?? 0,
          x: lengths[0] ?? 0,
          y: lengths[1] ?? 0,
        }
      })

const TRANSPARENT = "oklch(0 0 0 / 0)"

const EMPTY = {
  blur: 0,
  color: TRANSPARENT,
  inset: false,
  spread: 0,
  x: 0,
  y: 0,
}

const isColor = (value: FigmaValue): value is FigmaColor =>
  typeof value === "object" && "srgb" in value

const isAlias = (value: FigmaValue): value is { alias: string } =>
  typeof value === "object" && "alias" in value

export const figmaTheme = (
  tokens: TokensJson,
  probe: FigmaProbe,
  collection: string,
): FigmaTheme => {
  const meta = figmaTokenMeta(tokens).filter(probed)
  const modes = FIGMA_MODES.filter(({ id }) => probe[id])
  const [first] = modes
  const resolved = (id: string, cssVar: string) =>
    probe[id]?.tokens[cssVar] ?? ""
  const variables: FigmaVariable[] = []
  const byCssVar = new Map<string, FigmaVariable>()
  const raw = new Map<FigmaVariable, Record<string, FigmaValue>>()
  for (const token of meta) {
    const type = token.type && TYPES[token.type]
    if (!type || !token.type) continue
    const values: Record<string, FigmaValue> = {}
    const fallback = valueOf(token.type, resolved(first.id, token.cssVar))
    if (fallback === undefined) continue
    for (const mode of modes) {
      values[mode.id] =
        valueOf(token.type, resolved(mode.id, token.cssVar)) ?? fallback
    }
    const relative = probe[first.id].relative.includes(token.cssVar)
    const variable: FigmaVariable = {
      codeSyntax: `var(${token.cssVar})`,
      description: relative
        ? `${token.description} Scales with the font size: the value is at 16px.`.trim()
        : token.description,
      ...(token.type === "fontFamily" && {
        fonts: figmaFonts(resolved(first.id, token.cssVar)),
      }),
      hidden: token.tier === "primitive",
      name: token.name,
      scopes: scopesFor(token, relative),
      type,
      values,
    }
    variables.push(variable)
    byCssVar.set(token.cssVar, variable)
    raw.set(variable, { ...values })
  }
  for (const token of meta) {
    const variable = byCssVar.get(token.cssVar)
    if (!variable) continue
    for (const mode of modes) {
      const target = byCssVar.get(token.aliases[mode.id] ?? "")
      if (
        target &&
        target !== variable &&
        target.type === variable.type &&
        same(raw.get(target)?.[mode.id], raw.get(variable)?.[mode.id])
      ) {
        variable.values[mode.id] = { alias: target.name }
      }
    }
  }
  const effects: FigmaEffect[] = []
  for (const token of meta.filter(({ type }) => type === "shadow")) {
    const layers = Object.fromEntries(
      modes.map(({ id }) => [id, parseShadow(resolved(id, token.cssVar))]),
    )
    const count = Math.max(...modes.map(({ id }) => layers[id].length))
    if (count === 0) continue
    const key = token.name.split("/").at(-1)
    const helper = (
      name: string,
      type: FigmaVariableType,
      scopes: string[],
      values: Record<string, FigmaValue>,
    ) => {
      variables.push({
        description: `${token.cssVar}, shadow layer ${name.split("/")[2]}.`,
        helper: true,
        hidden: true,
        name,
        scopes,
        type,
        values,
      })
      return name
    }
    effects.push({
      description: `${token.description} CSS: var(${token.cssVar}).`.trim(),
      layers: Array.from({ length: count }, (_, index) => {
        const shape =
          modes.map(({ id }) => layers[id][index]).find(Boolean) ?? EMPTY
        const of = (id: string) =>
          layers[id][index] ?? { ...shape, color: TRANSPARENT }
        const field = (part: "blur" | "spread" | "x" | "y") => {
          const values = Object.fromEntries(
            modes.map(({ id }) => [id, of(id)[part]]),
          )
          return modes.every(({ id }) => values[id] === values[first.id])
            ? values[first.id]
            : helper(
                `effects/${key}/${index + 1}/${part}`,
                "FLOAT",
                ["EFFECT_FLOAT"],
                values,
              )
        }
        return {
          blur: field("blur"),
          color: helper(
            `effects/${key}/${index + 1}/color`,
            "COLOR",
            ["EFFECT_COLOR"],
            Object.fromEntries(
              modes.map(({ id }) => [
                id,
                figmaColor(of(id).color) ?? figmaColor(TRANSPARENT)!,
              ]),
            ),
          ),
          inset: of(first.id).inset,
          spread: field("spread"),
          x: field("x"),
          y: field("y"),
        }
      }),
      name: token.name,
    })
  }
  const text = FIGMA_TEXT.flatMap((definition) => {
    const probeText = probe[first.id].text[definition.name]
    if (!probeText) return []
    const fontSize = pixels(probeText.fontSize) ?? 16
    const fontWeight = number(probeText.fontWeight) ?? 400
    const fonts = figmaFonts(probeText.fontFamily)
    const lineHeight = pixels(probeText.lineHeight)
    const bind = (cssVars: string[], value: FigmaValue) =>
      cssVars
        .map((cssVar) => byCssVar.get(cssVar))
        .find(
          (variable) => variable && same(raw.get(variable)?.[first.id], value),
        )?.name
    return [
      {
        description: `.${definition.classes.split(" ").join(".")}`,
        fontSize,
        fontWeight,
        fonts,
        letterSpacing: pixels(probeText.letterSpacing) ?? 0,
        ...(lineHeight !== undefined && { lineHeight }),
        name: definition.name,
        textCase:
          probeText.textTransform === "uppercase"
            ? ("UPPER" as const)
            : ("ORIGINAL" as const),
        variables: {
          fontFamily: bind(
            definition.fontFamily,
            figmaFont(probeText.fontFamily),
          ),
          fontSize: bind([definition.fontSize], fontSize),
          fontWeight: bind([definition.fontWeight], fontWeight),
        },
      },
    ]
  })
  return {
    collection,
    effects,
    modes: modes.map(({ id, name }) => ({ id, name })),
    text,
    variables,
    version: 1,
  }
}

const DTCG_TYPES: Partial<Record<FigmaVariableType, string>> = {
  COLOR: "color",
  FLOAT: "number",
  STRING: "string",
}

export const figmaModeFiles = (theme: FigmaTheme) => {
  const native = theme.variables.filter(
    (variable) => !variable.helper && DTCG_TYPES[variable.type],
  )
  const path = (name: string) => name.replace("/", ".")
  return Object.fromEntries(
    theme.modes.map((mode) => {
      const doc: Record<string, Record<string, unknown>> = {}
      for (const variable of native) {
        const [group, key] = variable.name.split("/")
        const value = variable.values[mode.id]
        doc[group] ??= {}
        doc[group][key] = {
          ...(variable.description && { $description: variable.description }),
          $extensions: {
            "com.figma": {
              ...(variable.codeSyntax && {
                codeSyntax: { WEB: variable.codeSyntax },
              }),
              ...(variable.hidden && { hiddenFromPublishing: true }),
              scopes: variable.scopes,
            },
            ...(isColor(value) && { opui: { oklch: value.oklch } }),
          },
          $type: DTCG_TYPES[variable.type],
          $value: isAlias(value)
            ? `{${path(value.alias)}}`
            : isColor(value)
              ? {
                  alpha: value.alpha,
                  colorSpace: "srgb",
                  components: value.srgb,
                  hex: value.hex,
                }
              : value,
        }
      }
      return [mode.id, doc]
    }),
  )
}

export const figmaJson = (value: unknown) =>
  `${JSON.stringify(value, null, 2).replace(
    /\[\n\s+([^[\]{}]*?)\n\s*\]/g,
    (_, items: string) => `[${items.replace(/,\n\s*/g, ", ")}]`,
  )}\n`
