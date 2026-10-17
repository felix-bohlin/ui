const SKIPPABLE_DISPLAYS = new Set([
  "block",
  "flex",
  "flow-root",
  "grid",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "list-item",
])

const FORMATTING_CONTEXT_PARENTS = new Set([
  "flex",
  "grid",
  "inline-flex",
  "inline-grid",
])

function px(value: string) {
  return parseFloat(value) || 0
}

function keepsMarginsInside(style: CSSStyleDeclaration, parentDisplay: string) {
  if (FORMATTING_CONTEXT_PARENTS.has(parentDisplay)) return true
  if (style.display !== "block" && style.display !== "list-item") return true
  if (style.overflowX !== "visible" || style.overflowY !== "visible")
    return true
  if (style.float !== "none" || style.position === "absolute") return true
  return (
    px(style.paddingTop) + px(style.borderTopWidth) > 0 &&
    px(style.paddingBottom) + px(style.borderBottomWidth) > 0
  )
}

export function skipOffscreenRendering(root: Element = document.body) {
  const viewportHeight = window.innerHeight
  const targets: {
    element: HTMLElement
    height: number
    width: number
  }[] = []

  const visit = (parent: Element, parentDisplay: string) => {
    for (const child of parent.children) {
      if (!(child instanceof HTMLElement) || child.matches("dialog, [popover]"))
        continue

      const style = getComputedStyle(child)
      if (style.display === "contents") {
        visit(child, parentDisplay)
        continue
      }
      if (
        style.display === "none" ||
        style.position === "fixed" ||
        style.position === "sticky"
      )
        continue

      const rect = child.getBoundingClientRect()
      const offscreen = rect.bottom < 0 || rect.top > viewportHeight

      if (
        offscreen &&
        child.children.length > 0 &&
        SKIPPABLE_DISPLAYS.has(style.display) &&
        keepsMarginsInside(style, parentDisplay)
      ) {
        const scrollbarHeight =
          child.offsetHeight -
          child.clientHeight -
          px(style.borderTopWidth) -
          px(style.borderBottomWidth)
        const scrollbarWidth =
          child.offsetWidth -
          child.clientWidth -
          px(style.borderLeftWidth) -
          px(style.borderRightWidth)
        targets.push({
          element: child,
          height:
            rect.height -
            px(style.borderTopWidth) -
            px(style.borderBottomWidth) -
            px(style.paddingTop) -
            px(style.paddingBottom) -
            Math.max(0, scrollbarHeight),
          width:
            rect.width -
            px(style.borderLeftWidth) -
            px(style.borderRightWidth) -
            px(style.paddingLeft) -
            px(style.paddingRight) -
            Math.max(0, scrollbarWidth),
        })
      } else if (offscreen || rect.top < 0 || rect.bottom > viewportHeight) {
        visit(child, style.display)
      }
    }
  }

  visit(root, getComputedStyle(root).display)

  const restored = targets.map(({ element, height, width }) => {
    const previous = {
      containIntrinsicSize: element.style.containIntrinsicSize,
      contentVisibility: element.style.contentVisibility,
    }
    element.style.containIntrinsicSize = `${width}px ${height}px`
    element.style.contentVisibility = "hidden"
    return () => {
      element.style.containIntrinsicSize = previous.containIntrinsicSize
      element.style.contentVisibility = previous.contentVisibility
    }
  })

  return () => restored.forEach((restore) => restore())
}
