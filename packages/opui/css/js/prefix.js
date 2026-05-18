import config from "virtual:opui-config"

/**
 * Prefixes CSS class names with the configured prefix.
 *
 * Transforms class names in any format that Astro's `class:list` directive accepts.
 * The prefix is only applied if prefix is set.
 *
 * @see https://docs.astro.build/en/reference/directives-reference/#classlist
 */
export function prefixClasses(pfx, classes) {
  if (!classes || !pfx) return classes

  if (typeof classes === "string") {
    return classes
      .split(" ")
      .filter(Boolean)
      .map((c) => `${pfx}${c}`)
      .join(" ")
  }

  if (Array.isArray(classes)) {
    return classes.map((c) => prefixClasses(pfx, c))
  }

  if (classes instanceof Set) {
    return new Set([...classes].map((c) => prefixClasses(pfx, c)))
  }

  if (typeof classes === "object") {
    return Object.entries(classes).reduce((acc, [key, value]) => {
      acc[`${pfx}${key}`] = value
      return acc
    }, {})
  }

  return classes
}

/**
 * Prefixes CSS class names with the configured prefix.
 *
 * Spread syntax for less verbosity in components.
 */
export function prefix(...classes) {
  return prefixClasses(config?.prefix, classes)
}
