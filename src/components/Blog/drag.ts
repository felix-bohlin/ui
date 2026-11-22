export const fromInlineStart = (element: HTMLElement, event: PointerEvent) => {
  const rect = element.getBoundingClientRect()
  return getComputedStyle(element).direction === "rtl"
    ? rect.right - event.clientX
    : event.clientX - rect.left
}

export const drag = (
  handle: HTMLElement,
  {
    move,
    root = handle,
    start,
  }: {
    move: (event: PointerEvent) => void
    root?: HTMLElement
    start?: (event: PointerEvent) => void
  },
) => {
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return
    event.preventDefault()
    handle.setPointerCapture(event.pointerId)
    root.dataset.dragging = ""
    start?.(event)
    const end = () => {
      delete root.dataset.dragging
      handle.removeEventListener("pointermove", move)
    }
    handle.addEventListener("pointermove", move)
    handle.addEventListener("lostpointercapture", end, { once: true })
  })
}
