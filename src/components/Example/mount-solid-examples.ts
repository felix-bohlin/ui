import { render } from "@solidjs/web"
import type { Component } from "solid-js"

const loaders = import.meta.glob("../../component-examples/**/*.tsx") as Record<
  string,
  () => Promise<{ default: Component }>
>

const registry = new Map<string, () => Promise<{ default: Component }>>()
for (const [path, loader] of Object.entries(loaders)) {
  const match = path.match(/component-examples\/(.+)\.tsx$/)
  if (match) registry.set(match[1], loader)
}

async function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-solid-example]:not([data-solid-mounted])",
  )

  for (const el of targets) {
    const id = el.getAttribute("data-solid-example")
    if (!id) continue

    const loader = registry.get(id)
    if (!loader) continue

    el.setAttribute("data-solid-mounted", "")
    const mod = await loader()
    el.innerHTML = ""
    render(() => mod.default({}), el)
  }
}

mountAll()
document.addEventListener("astro:after-swap", mountAll)
