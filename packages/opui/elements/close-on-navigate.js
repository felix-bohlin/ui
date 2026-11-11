const KEY = Symbol.for("opui-close-on-navigate")

const close = () => {
  for (const popover of document.querySelectorAll(
    ".ui-menu:popover-open, .ui-popover[data-close-on-navigate]:popover-open",
  )) {
    if (popover.matches(":popover-open")) popover.hidePopover()
  }
  for (const drawer of document.querySelectorAll(
    "dialog.ui-drawer[data-close-on-navigate][open]",
  )) {
    drawer.close()
  }
}

const { navigation } = globalThis
if (navigation && !navigation[KEY]) {
  navigation[KEY] = true
  navigation.addEventListener("navigate", close)
}
