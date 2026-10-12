import { createElement, type ComponentType } from "react"
import { createRoot } from "react-dom/client"

const loaders = import.meta.glob(
  "../../component-examples/**/*.react.tsx",
) as Record<string, () => Promise<{ default: ComponentType }>>

const registry = new Map<string, () => Promise<{ default: ComponentType }>>()
for (const [path, loader] of Object.entries(loaders)) {
  const match = path.match(/component-examples\/(.+)\.react\.tsx$/)
  if (match) registry.set(match[1], loader)
}

const pending = new WeakSet<HTMLElement>()

async function mountExample(el: HTMLElement) {
  const id = el.getAttribute("data-react-example")
  if (!id || pending.has(el)) return

  const loader = registry.get(id)
  if (!loader) return

  pending.add(el)
  const mod = await loader()
  el.innerHTML = ""
  createRoot(el, {
    identifierPrefix: `${id.replace(/[^\w-]/g, "-")}-`,
  }).render(createElement(mod.default))
  el.setAttribute("data-react-mounted", "")
}

async function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-react-example]:not([data-react-mounted])",
  )

  await Promise.all([...targets].map(mountExample))
}

mountAll()
document.addEventListener("astro:after-swap", mountAll)
