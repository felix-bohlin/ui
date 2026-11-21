import { isServer, setProperty } from "@solidjs/web"
import { createRenderEffect, untrack } from "solid-js"
import { keepSelected } from "./Select/selection"

const INITIAL = {
  checked: "defaultChecked",
  value: "defaultValue",
}

export const control = <V>(
  prop: keyof typeof INITIAL,
  read: () => V,
  fallback?: V,
) => {
  let element: Element | undefined
  const initial = untrack(read)
  createRenderEffect(
    read,
    (value, previous) => {
      if (element && value !== undefined && value !== previous) {
        setProperty(element, prop, value)
      }
    },
    { defer: true },
  )
  return {
    ref: (node: Element) => {
      if (!element) {
        if (initial !== undefined) setProperty(node, prop, initial)
        else if (fallback !== undefined) {
          if (node instanceof HTMLSelectElement) {
            setProperty(node, prop, fallback)
            queueMicrotask(() => keepSelected(node, fallback))
          } else setProperty(node, INITIAL[prop], fallback)
        }
      }
      element = node
    },
    server: (isServer && (initial ?? fallback) !== undefined
      ? { [prop]: initial ?? fallback }
      : {}) as object,
  }
}

export const optionSelected = (selected: boolean | undefined) => ({
  ref: (option: HTMLOptionElement) => {
    if (selected !== undefined) setProperty(option, "selected", selected)
  },
  server: (isServer && selected !== undefined ? { selected } : {}) as object,
})

export const hydrating = (custom = true) =>
  (isServer && custom ? { "data-hydrating": "" } : {}) as object

export const hydrated = (element: Element) =>
  element.removeAttribute("data-hydrating")

export const callHandler = <E extends Event>(handler: unknown, event: E) => {
  if (typeof handler === "function") handler(event)
  else if (Array.isArray(handler) && typeof handler[0] === "function")
    handler[0](handler[1], event)
}
