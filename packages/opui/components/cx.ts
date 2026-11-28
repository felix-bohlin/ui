type ClassValue =
  | ClassValue[]
  | Record<string, unknown>
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined

const flatten = (value: unknown): string[] => {
  if (!value || value === true) return []
  if (typeof value === "string") return [value]
  if (typeof value === "number" || typeof value === "bigint") {
    return [String(value)]
  }
  if (Array.isArray(value)) return value.flatMap(flatten)
  if (typeof value !== "object") return []
  return Object.entries(value).flatMap(([key, on]) => (on ? [key] : []))
}

export const cx = (values: ClassValue[]) =>
  flatten(values).join(" ") || undefined

export const classAttrs = (value: unknown): { class?: string } => {
  const className = flatten(value).join(" ")
  return className ? { class: className } : {}
}
