type Vars = Record<string, number | string | undefined>

export const styleVars = (vars: Vars) =>
  Object.entries(vars)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ")

export function mergeStyle(
  vars: Vars,
  style?: string | null,
): string | undefined
export function mergeStyle(
  vars: Vars,
  style?: object | string | null,
): Record<string, unknown> | string | undefined
export function mergeStyle(vars: Vars, style?: object | string | null) {
  return typeof style === "object" && style !== null
    ? { ...vars, ...style }
    : [styleVars(vars), style].filter(Boolean).join(" ") || undefined
}
