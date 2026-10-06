import { createComponent } from "solid-js"
import { render } from "@solidjs/web"

export default (element) =>
  (Component, props, { default: children, ...slotted }) => {
    const slots = {}
    for (const [key, value] of Object.entries(slotted)) {
      const slot = document.createElement("astro-slot")
      slot.setAttribute("name", key)
      slot.innerHTML = value
      slots[key] = slot
    }
    let defaultSlot
    if (children != null) {
      defaultSlot = document.createElement("astro-slot")
      defaultSlot.innerHTML = children
    }
    element.innerHTML = ""
    const dispose = render(
      () =>
        createComponent(Component, {
          ...props,
          ...slots,
          children: defaultSlot,
        }),
      element,
    )
    element.addEventListener("astro:unmount", () => dispose(), { once: true })
  }
