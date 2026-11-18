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
