import { isServer, setProperty } from "@solidjs/web"
import { createRenderEffect, isHydratable, untrack } from "solid-js"

const follow = (
  read: () => boolean | undefined,
  write: (value: boolean) => void,
) => {
  const initial = untrack(read)
  let last = initial
  createRenderEffect(read, (value) => {
    if (value !== undefined && value !== last) write(value)
    last = value
  })
  return initial
}

export const control = (
  read: () => boolean | undefined,
  readDefault?: () => boolean | undefined,
) => {
  let element: Element | undefined
  const initial = follow(read, (checked) => {
    if (element) setProperty(element, "checked", checked)
  })
  const fallback =
    readDefault &&
    follow(readDefault, (defaultChecked) => {
      if (element) setProperty(element, "defaultChecked", defaultChecked)
    })
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
  (isServer && custom && isHydratable()
    ? { "data-hydrating": "" }
    : {}) as object

export const hydrated = (element: Element) =>
  element.removeAttribute("data-hydrating")

export const callHandler = <E extends Event>(handler: unknown, event: E) => {
  if (typeof handler === "function") handler(event)
  else if (Array.isArray(handler) && typeof handler[0] === "function")
    handler[0](handler[1], event)
}
