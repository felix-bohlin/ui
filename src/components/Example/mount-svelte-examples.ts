import { mount, type Component } from "svelte"

const loaders = import.meta.glob(
  "../../component-examples/**/*.svelte",
) as Record<string, () => Promise<{ default: Component }>>

const registry = new Map<string, () => Promise<{ default: Component }>>()
for (const [path, loader] of Object.entries(loaders)) {
  const match = path.match(/component-examples\/(.+)\.svelte$/)
  if (match) registry.set(match[1], loader)
}

const pending = new WeakSet<HTMLElement>()

async function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-svelte-example]:not([data-svelte-mounted])",
  )

  for (const el of targets) {
    const id = el.getAttribute("data-svelte-example")
    if (!id || pending.has(el)) continue

    const loader = registry.get(id)
    if (!loader) continue

    pending.add(el)
    const mod = await loader()
    el.innerHTML = ""
    mount(mod.default, { target: el })
    el.setAttribute("data-svelte-mounted", "")
  }
}

mountAll()
document.addEventListener("astro:after-swap", mountAll)
