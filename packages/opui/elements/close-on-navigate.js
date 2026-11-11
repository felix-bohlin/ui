const KEY = Symbol.for("opui-close-on-navigate")
const CHOICES =
  ".ui-menu:popover-open, dialog.ui-drawer[data-close-on-navigate][open]"
const OVERLAYS = `${CHOICES}, .ui-popover[data-close-on-navigate]:popover-open`

const overlays = (event) => {
  if (event.defaultPrevented || event.downloadRequest != null) return []
  const inPlace =
    event.hashChange ||
    (event.navigationType === "replace" &&
      new URL(event.destination.url).pathname === location.pathname)
  if (!inPlace) return [...document.querySelectorAll(OVERLAYS)]
  const link = event.sourceElement
  return link
    ? [...document.querySelectorAll(CHOICES)].filter((overlay) =>
        overlay.contains(link),
      )
    : []
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
