import { highlightAll } from "microlighter"

const renewHighlights = () => {
  for (const highlight of CSS.highlights.values()) {
    const ranges = [...highlight]
    highlight.clear()
    for (const range of ranges) highlight.add(new StaticRange(range))
  }
}

export const highlightCode = async () => {
  const codeBlocks = await highlightAll()
  renewHighlights()
  return codeBlocks
}

export const renewHighlightsWhenShown = () => {
  const renewIfCode = (element: Element | null | undefined) => {
    if (element?.querySelector("pre > code"))
      requestAnimationFrame(renewHighlights)
  }
  document.addEventListener("change", (event) =>
    renewIfCode((event.target as Element).closest(".ui-tabs")),
  )
  document.addEventListener(
    "toggle",
    (event) => renewIfCode(event.target as Element),
    true,
  )
}
