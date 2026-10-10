import { createApp } from "vue"

const loaders = import.meta.glob("../../component-examples/**/*.vue") as Record<
  string,
  () => Promise<{ default: unknown }>
>

const registry = new Map<string, () => Promise<{ default: unknown }>>()
for (const [path, loader] of Object.entries(loaders)) {
  const match = path.match(/component-examples\/(.+)\.vue$/)
  if (match) registry.set(match[1], loader)
}

async function mount(el: HTMLElement) {
  const id = el.getAttribute("data-vue-example")
  if (!id) return

  const loader = registry.get(id)
  if (!loader) return

  el.setAttribute("data-vue-mounted", "")
  const mod = await loader()
  el.innerHTML = ""
  const app = createApp(mod.default as Parameters<typeof createApp>[0])
  app.config.idPrefix = id.replace(/[^\w-]/g, "-")
  app.mount(el)
}

async function mountAll() {
  const targets = document.querySelectorAll<HTMLElement>(
    "[data-vue-example]:not([data-vue-mounted])",
  )

  await Promise.all([...targets].map(mount))
}

mountAll()
