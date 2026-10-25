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
export function mergeStyle(
  vars: Vars,
  style?: object | string | null,
): Record<string, unknown> | string | undefined
export function mergeStyle(vars: Vars, style?: object | string | null) {
  if (typeof style === "object" && style !== null) {
    const entries = definedVars(vars)
    return entries.length || Object.keys(style).length
      ? { ...Object.fromEntries(entries), ...style }
      : undefined
  }
  return [styleVars(vars), style].filter(Boolean).join(" ") || undefined
}
