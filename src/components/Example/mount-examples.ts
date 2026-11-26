export function mountExamples<Module>(
  framework: string,
  extension: string,
  loaders: Record<string, () => Promise<Module>>,
  mount: (el: HTMLElement, mod: Module, id: string) => void,
) {
  const pending = new WeakSet<HTMLElement>()

  async function mountExample(el: HTMLElement) {
    const id = el.getAttribute(`data-${framework}-example`)
    if (!id || pending.has(el)) return

    const loader = loaders[`../../component-examples/${id}${extension}`]
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
