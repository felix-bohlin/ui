import { highlightAll } from "microlighter"

export const highlightCode = async () => {
  const codeBlocks = await highlightAll()
  for (const highlight of CSS.highlights.values()) {
    const ranges = [...highlight]
    highlight.clear()
    for (const range of ranges) highlight.add(new StaticRange(range))
  }
  return codeBlocks
}
