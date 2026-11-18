type Vars = Record<string, number | string | undefined>

const definedVars = (vars: Vars) =>
  Object.entries(vars).filter(
    ([, value]) => value !== undefined && value !== "",
  )

export const styleVars = (vars: Vars) =>
  definedVars(vars)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ")

export function mergeStyle(
  vars: Vars,
  style?: string | null,
): string | undefined
export function mergeStyle<S extends object>(
  vars: Vars,
  style: S,
): S | undefined
export function mergeStyle<S extends object>(
  vars: Vars,
  style?: S | string | false | null,
): S | string | undefined
export function mergeStyle(vars: Vars, style?: object | string | false | null) {
  if (typeof style === "object" && style !== null) {
    const entries = definedVars(vars)
    return entries.length || Object.keys(style).length
      ? { ...Object.fromEntries(entries), ...style }
      : undefined
  }
  return [styleVars(vars), style].filter(Boolean).join(" ") || undefined
}

export const styleAttrs = <S>(style: S) => (style ? { style } : {})

export const cssString = (text: string) =>
  `"${text
    .replace(/["\\]/g, "\\$&")
    .replace(/\r\n|[\n\r]/g, "\\a ")
    .replace(/\f/g, "\\c ")}"`

export const counterLabel = (template: string, counter: string) =>
  template
    .split("{number}")
    .flatMap((text, index) => [
      index > 0 ? `counter(${counter})` : "",
      text ? cssString(text) : "",
    ])
    .filter(Boolean)
    .join(" ")

const pluralRules = (lang?: string | false | null) => {
  try {
    return new Intl.PluralRules(lang || "en")
  } catch {
    return new Intl.PluralRules("en")
  }
}

export const pluralLabel = (
  templates: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string },
  count: number,
  lang?: string | false | null,
) =>
  (templates[pluralRules(lang).select(count)] ?? templates.other).replaceAll(
    "{count}",
    String(count),
  )
