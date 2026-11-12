const KEY = Symbol.for("opui-close-on-navigate")
const OVERLAYS =
  ".ui-menu:popover-open, .ui-popover[data-close-on-navigate]:popover-open, dialog.ui-drawer[data-close-on-navigate][open]"

const overlays = (event) => {
  if (event.defaultPrevented || event.downloadRequest != null) return []
  const open = [...document.querySelectorAll(OVERLAYS)]
  const inPlace =
    (event.hashChange && event.navigationType !== "traverse") ||
    (event.navigationType === "replace" &&
      new URL(event.destination.url).pathname === location.pathname)
  if (!inPlace) return open
  const source =
    event.sourceElement ?? document.activeElement?.closest("a[href]")
  return source ? open.filter((overlay) => overlay.contains(source)) : []
}

const close = (event) => {
  for (const overlay of overlays(event)) {
    if (overlay.matches("dialog")) overlay.close()
    else if (overlay.matches(":popover-open")) overlay.hidePopover()
  }
}

const { navigation } = globalThis
if (navigation && !navigation[KEY]) {
  navigation[KEY] = true
  navigation.addEventListener("navigate", close)
}
