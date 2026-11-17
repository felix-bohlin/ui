/**
 * Swipe a Drawer at the block start or block end toward its edge to close
 * it, from its grab handle or its header. The swipe is a close request, like
 * Esc: it does nothing with `closedby="none"`, and a `cancel` listener can
 * keep the drawer open. The content keeps scrolling as usual, and a mouse
 * drags nothing.
 */
const KEY = Symbol.for("opui-drawer-swipe")
const DRAWER = "dialog.ui-drawer:is(.ui-block-start, .ui-block-end)[open]"
const CONTROL =
  'a[href], button, input, label, select, summary, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'
// Past a quarter of the drawer, or with a flick of half a pixel per
// millisecond, it closes. Otherwise it settles back.
const DISTANCE = 0.25
const SPEED = 0.5
// A finger that stopped before it lifted isn't flicking.
const STILL = 100

const closedBy = (drawer) =>
  (drawer.closedBy ?? drawer.getAttribute("closedby") ?? "").toLowerCase()

const requestClose = (drawer) => {
  if (typeof drawer.requestClose === "function") {
    drawer.requestClose()
  } else if (drawer.dispatchEvent(new Event("cancel", { cancelable: true }))) {
    drawer.close()
  }
}

const grab = (event) => {
  if (event.pointerType === "mouse" || !event.isPrimary) return
  const { target } = event
  if (!(target instanceof Element)) return
  const drawer = target.closest(DRAWER)
  if (!drawer || closedBy(drawer) === "none") return
  // The grab handle is the drawer's own pseudo-element, so a touch on it
  // targets the drawer. The header's controls stay controls.
  const header = target.closest(".ui-header")
  if (target !== drawer && header?.parentElement !== drawer) return
  const control = target.closest(CONTROL)
  if (control && drawer.contains(control)) return

  const toward = drawer.classList.contains("ui-block-start") ? -1 : 1
  const size = drawer.getBoundingClientRect().height || 1
  const { style } = drawer
  const duration = style.getPropertyValue("--_duration")
  const start = event.clientY
  let offset = 0
  let speed = 0
  let lastY = start
  let lastTime = event.timeStamp
  const controller = new AbortController()

  // Follow the finger without the open and close transition.
  style.setProperty("--_duration", "0s")
  drawer.setPointerCapture?.(event.pointerId)

  const move = (moved) => {
    if (moved.pointerId !== event.pointerId) return
    const distance = (moved.clientY - start) * toward
    // Toward the edge it follows; the other way it gives a little.
    offset = (distance > 0 ? distance : Math.max(distance / 4, -16)) * toward
    const elapsed = moved.timeStamp - lastTime
    if (elapsed > 0) {
      speed = 0.8 * ((moved.clientY - lastY) / elapsed) + 0.2 * speed
    }
    lastY = moved.clientY
    lastTime = moved.timeStamp
    style.setProperty("--_swipe-offset", `${offset}px`)
    style.setProperty(
      "--_swipe-progress",
      String(Math.min(1, Math.max(0, offset * toward) / size)),
    )
  }

  const release = (released) => {
    if (released.pointerId !== event.pointerId) return
    controller.abort()
    if (released.timeStamp - lastTime > STILL) speed = 0
    const closes =
      released.type === "pointerup" &&
      offset * toward > 0 &&
      (offset * toward > size * DISTANCE || speed * toward > SPEED)
    // In one go, so the drawer animates from where it was let go: closed
    // through the close request, or back open.
    if (duration) style.setProperty("--_duration", duration)
    else style.removeProperty("--_duration")
    if (closes) requestClose(drawer)
    style.removeProperty("--_swipe-offset")
    style.removeProperty("--_swipe-progress")
  }

  const options = { signal: controller.signal }
  drawer.addEventListener("pointermove", move, options)
  drawer.addEventListener("pointerup", release, options)
  drawer.addEventListener("pointercancel", release, options)
}

if (typeof document !== "undefined" && !document[KEY]) {
  document[KEY] = true
  document.addEventListener("pointerdown", grab)
}
