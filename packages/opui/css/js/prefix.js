import config from "virtual:opui-config"

/** @type {import('./prefix.d.ts').prefixClasses} */
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

/** @type {import('./prefix.d.ts').prefix} */
export function prefix(...classes) {
  return prefixClasses(config?.prefix, classes)
}
