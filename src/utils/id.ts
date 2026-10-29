export const createIdGenerator = () => {
  // The map to store how many times each prefix has been used in this request.
  const counts = new Map<string, number>()
  return (prefix: string) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
}

export const exampleIdBase = (key: string) => {
  const [slug, name] = key.split("/")
  const example = name
    .replace(/Code$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
  return `${slug}-${example}`
}

export const EXAMPLE_ID_PARTS: Record<string, string> = {
  bottom: "-bottom",
  "color-field": "",
  "end-text": "-end-text",
  "number-stepper": "",
  range: "",
  "range-end": "-end-text",
  "range-label": "-label",
  "range-list": "-list",
  "range-start": "-start-text",
  "select-label": "-label",
  "start-text": "-start-text",
  tab: "",
  "text-field": "",
  top: "-top",
}

export const EXAMPLE_NAME_PREFIXES = ["tabs", "toggle-group"]

export const createExampleIdGenerator = (key: string, source = "") => {
  const base = exampleIdBase(key)
  const names = new Map<string, number>()
  const used = new Set<string>()
  let instance = 0
  return (prefix: string) => {
    if (EXAMPLE_NAME_PREFIXES.includes(prefix)) {
      const count = (names.get(prefix) ?? 0) + 1
      names.set(prefix, count)
      return `${base}-${count}`
    }
    const part = EXAMPLE_ID_PARTS[prefix]
    if (part === undefined) {
      throw new Error(
        `$id("${prefix}") has no entry in EXAMPLE_ID_PARTS (src/utils/id.ts)`,
      )
    }
    if (instance === 0 || used.has(part)) {
      used.clear()
      instance++
    }
    while (source.includes(`"${base}-${instance}${part}"`)) instance++
    used.add(part)
    return `${base}-${instance}${part}`
  }
}
