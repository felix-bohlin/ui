import { isServer, setProperty } from "@solidjs/web"
import { createRenderEffect, untrack } from "solid-js"

export const control = (
  read: () => boolean | undefined,
  fallback?: boolean,
) => {
  let element: Element | undefined
  const initial = untrack(read)
  createRenderEffect(
    read,
    (checked, previous) => {
      if (element && checked !== undefined && checked !== previous) {
        setProperty(element, "checked", checked)
      }
    },
    { defer: true },
  )
  return {
    ref: (node: Element) => {
      if (!element) {
        if (initial !== undefined) setProperty(node, "checked", initial)
        else if (fallback !== undefined) {
          setProperty(node, "defaultChecked", fallback)
        }
      }
      element = node
    },
    server: (isServer && (initial ?? fallback) !== undefined
      ? { checked: initial ?? fallback }
      : {}) as object,
  }
}

export const hydrating = (custom = true) =>
  (isServer && custom ? { "data-hydrating": "" } : {}) as object

export const hydrated = (element: Element) =>
  element.removeAttribute("data-hydrating")

export const callHandler = <E extends Event>(handler: unknown, event: E) => {
  if (typeof handler === "function") handler(event)
  else if (Array.isArray(handler) && typeof handler[0] === "function")
    handler[0](handler[1], event)
}
