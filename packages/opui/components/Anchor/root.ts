const roots = new Set(["ui-badge", "ui-tooltip"])

export const extendsAnchor = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.split(/\s+/).some((name) => roots.has(name))
  }
  if (Array.isArray(value)) return value.some(extendsAnchor)
  if (value && typeof value === "object") {
    return Object.entries(value).some(([name, on]) => on && roots.has(name))
  }
  return false
}
