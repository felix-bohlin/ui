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

async function mountExample(el: HTMLElement) {
  const id = el.getAttribute("data-svelte-example")
  if (!id || pending.has(el)) return

  const loader = registry.get(id)
  if (!loader) return

  pending.add(el)
  const mod = await loader()
  el.innerHTML = ""
  mount(mod.default, { target: el })
  el.setAttribute("data-svelte-mounted", "")
}

async function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-svelte-example]:not([data-svelte-mounted])",
  )

  await Promise.all([...targets].map(mountExample))
}

mountAll()
document.addEventListener("astro:after-swap", mountAll)
