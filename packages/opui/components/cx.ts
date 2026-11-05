type ClassValue =
  | ClassValue[]
  | Record<string, unknown>
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined

const flatten = (value: ClassValue): string[] => {
  if (!value || value === true) return []
  if (typeof value === "string") return [value]
  if (typeof value === "number" || typeof value === "bigint") {
    return [String(value)]
  }
  if (Array.isArray(value)) return value.flatMap(flatten)
  return Object.keys(value).filter((key) => value[key])
}

export const cx = (values: ClassValue[]) =>
  flatten(values).join(" ") || undefined

export const classAttrs = (value: ClassValue): { class?: string } => {
  const className = cx([value])
  return className ? { class: className } : {}
}
