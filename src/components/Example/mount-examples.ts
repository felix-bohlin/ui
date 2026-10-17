export function mountExamples<Module>(
  framework: string,
  extension: string,
  loaders: Record<string, () => Promise<Module>>,
  mount: (el: HTMLElement, mod: Module, id: string) => void,
) {
  const registry = new Map<string, () => Promise<Module>>()
  for (const [path, loader] of Object.entries(loaders)) {
    const start = path.indexOf("component-examples/")
    if (start === -1 || !path.endsWith(extension)) continue
    registry.set(
      path.slice(start + "component-examples/".length, -extension.length),
      loader,
    )
  }

  const pending = new WeakSet<HTMLElement>()

  async function mountExample(el: HTMLElement) {
    const id = el.getAttribute(`data-${framework}-example`)
    if (!id || pending.has(el)) return

    const loader = registry.get(id)
    if (!loader) return

    pending.add(el)
    const mod = await loader()
    el.innerHTML = ""
    mount(el, mod, id)
    el.setAttribute(`data-${framework}-mounted`, "")
  }

  const targets = document.querySelectorAll<HTMLElement>(
    `[data-${framework}-example]:not([data-${framework}-mounted])`,
  )
  return Promise.all([...targets].map(mountExample))
}
