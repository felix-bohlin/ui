const KEY = Symbol.for("opui-close-on-navigate")

const keepsPage = ({ destination, hashChange, navigationType }) =>
  destination.sameDocument &&
  !hashChange &&
  navigationType !== "traverse" &&
  new URL(destination.url).pathname === location.pathname

const close = (event) => {
  if (keepsPage(event)) return
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
