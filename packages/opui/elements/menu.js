const KEY = Symbol.for("opui-menu")

const ITEM =
  '.ui-menu > li > :is(a[href], button:is([type="reset"], [type="submit"])):not([data-keep-open])'

const close = (event) => {
  const item = event.target.closest?.(ITEM)
  if (!item) return
  let menu = item.closest(".ui-menu")
  for (
    let outer = menu;
    outer;
    outer = outer.parentElement?.closest(".ui-menu")
  ) {
    menu = outer
  }
  if (menu.matches(":popover-open")) menu.hidePopover()
}

const { document } = globalThis
if (document && !document[KEY]) {
  document[KEY] = true
  document.addEventListener("click", close)
}

export {}
