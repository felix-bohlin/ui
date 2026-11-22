const KEY = Symbol.for("opui-close-on-navigate")

const DRAWER = "dialog.ui-drawer[data-close-on-navigate][open]"

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
  for (const drawer of document.querySelectorAll(DRAWER)) {
    drawer.close()
  }
}

const closeDrawer = (event) => {
  const link = event.target.closest?.("a[href]:not([data-keep-open])")
  link?.closest(DRAWER)?.close()
}

const { document, navigation } = globalThis
if (navigation && !navigation[KEY]) {
  navigation[KEY] = true
  navigation.addEventListener("navigate", close)
}
if (document && !document[KEY]) {
  document[KEY] = true
  document.addEventListener("click", closeDrawer)
}
