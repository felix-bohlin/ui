import { NoHydration, createComponent } from "solid-js"
import { renderToString, ssr } from "@solidjs/web"

const slotName = (str) =>
  str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase())

function check(Component, props, children) {
  if (typeof Component !== "function") return false
  const componentStr = Component.toString()
  if (componentStr.includes("$$payload") || componentStr.includes("$$renderer"))
    return false
  const isSolid = /\b(?:createComponent|ssr|ssrElement|ssrHydrationKey)\)?\(/.test(
    componentStr,
  )
  try {
    return typeof renderToStaticMarkup(Component, props, children).html === "string"
  } catch (error) {
    if (isSolid) throw error
    return false
  }
}

function renderToStaticMarkup(
  Component,
  props,
  { default: children, ...slotted },
) {
  const slots = {}
  for (const [key, value] of Object.entries(slotted)) {
    slots[slotName(key)] = ssr(value)
  }

  const html = renderToString(
    () =>
      createComponent(NoHydration, {
        get children() {
          return createComponent(Component, {
            ...props,
            ...slots,
            children: children != null ? ssr(children) : children,
          })
        },
      }),
    { noScripts: true },
  )

  return { attrs: {}, html: html.replace(/<!--(?:\$|\/|!\$)-->/g, "") }
}

export default {
  name: "opui-solid",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
}
