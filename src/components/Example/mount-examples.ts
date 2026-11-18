export async function mountExamples<Module>(
  framework: string,
  extension: string,
  loaders: Record<string, () => Promise<Module>>,
  mount: (el: HTMLElement, mod: Module, id: string) => void,
  keepsMarkup: (el: HTMLElement) => boolean = () => false,
) {
  const targets = [
    ...document.querySelectorAll<HTMLElement>(
      `[data-${framework}-example]:not([data-${framework}-mounted])`,
    ),
  ].flatMap((el) => {
    const id = el.getAttribute(`data-${framework}-example`)
    const loader = id && loaders[`../../component-examples/${id}${extension}`]
    return loader ? [{ el, id, loader }] : []
  })
  const modules = await Promise.all(targets.map(({ loader }) => loader()))

  for (const [index, { el, id }] of targets.entries()) {
    if (!keepsMarkup(el)) el.innerHTML = ""
    el.dispatchEvent(new Event("example-mount", { bubbles: true }))
    try {
      mount(el, modules[index], id)
    } catch (error) {
      reportError(error)
    }
    el.setAttribute(`data-${framework}-mounted`, "")
  }
}
