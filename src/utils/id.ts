export const createIdGenerator = () => {
  // The map to store how many times each prefix has been used in this request.
  const counts = new Map<string, number>()
  return (prefix: string) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
}
