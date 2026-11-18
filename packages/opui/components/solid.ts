import { isServer, setProperty } from "@solidjs/web"
import { createRenderEffect } from "solid-js"
import { keepSelected } from "./Select/selection"

const INITIAL = {
  checked: "defaultChecked",
  selected: "defaultSelected",
  value: "defaultValue",
}

export const control = <V>(
  prop: keyof typeof INITIAL,
  read: (() => V) | undefined,
  initial?: V,
) => {
  let element: Element | undefined
  if (read) {
    createRenderEffect(
      read,
      (value, previous) => {
        if (element && value !== undefined && value !== previous) {
          setProperty(element, prop, value)
        }
      },
      { defer: true },
    )
  }
  return {
    ref: (node: Element) => {
      if (!element && initial !== undefined) {
        setProperty(
          node,
          node.nodeName === "SELECT" ? prop : INITIAL[prop],
          initial,
        )
        if (node instanceof HTMLSelectElement) {
          queueMicrotask(() => keepSelected(node, initial))
        }
      }
      element = node
    },
    server: (isServer && initial !== undefined
      ? { [prop]: initial }
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

export const restoreChecked = (input: HTMLInputElement, read: () => unknown) =>
  queueMicrotask(() => {
    const selected = read()
    if (selected === undefined) return
    const values = [selected].flat().map(String)
    const inputs = input.form
      ? [...input.form.elements]
      : [...(input.getRootNode() as ParentNode).querySelectorAll("input")]
    for (const item of input.name ? inputs : [input]) {
      if (
        item instanceof HTMLInputElement &&
        item.form === input.form &&
        item.name === input.name &&
        item.type === input.type
      ) {
        const checked = values.includes(item.value)
        if (item.checked !== checked) item.checked = checked
      }
    }
  })

export const seedChecked =
  (report: (input: HTMLInputElement) => void) => (input: HTMLInputElement) => {
    if (
      input.checked !== input.defaultChecked &&
      (input.checked || input.type === "checkbox")
    ) {
      queueMicrotask(() => report(input))
    }
  }
