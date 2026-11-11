const KEY = Symbol.for("opui-close-on-navigate")

const close = () => {
  for (const menu of document.querySelectorAll(".ui-menu:popover-open")) {
    if (menu.matches(":popover-open")) menu.hidePopover()
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
