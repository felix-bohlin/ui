type ClassValue =
  ClassValue[] | Record<string, unknown> | string | false | null | undefined

const flatten = (value: ClassValue): string[] => {
  if (!value) return []
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(flatten)
  return Object.keys(value).filter((key) => value[key])
}

export const cx = (values: ClassValue[]) =>
  flatten(values).join(" ") || undefined
