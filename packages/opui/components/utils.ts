type ClassListValue =
  | string
  | Record<string, any>
  | Set<string>
  | ClassListValue[]
  | undefined

/**
 * Prefixes CSS class names with the OPUI_PREFIX environment variable, if provided.
 *
 * Transforms class names in any format that Astro's `class:list` directive accepts.
 * The prefix is only applied if the `OPUI_PREFIX` environment variable is set.
 *
 * @see https://docs.astro.build/en/reference/directives-reference/#classlist
 *
 */
export const prefixClasses = (classes: ClassListValue): ClassListValue => {
  const PREFIX = process.env.OPUI_PREFIX || ""

  if (!classes) return classes

  if (typeof classes === "string") {
    return classes
      .split(" ")
      .filter(Boolean)
      .map((c) => `${PREFIX}${c}`)
      .join(" ")
  }

  if (Array.isArray(classes)) {
    return classes.map((c) => prefixClasses(c))
  }

  if (classes instanceof Set) {
    return new Set(
      [...classes].map((c) => prefixClasses(c as string)),
    ) as Set<string>
  }

  if (typeof classes === "object") {
    return Object.entries(classes as Record<string, boolean>).reduce(
      (acc, [key, value]) => {
        acc[`${PREFIX}${key}`] = value
        return acc
      },
      {} as Record<string, boolean>,
    )
  }

  return classes
}
