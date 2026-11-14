type ProbeSet = { className: string; colors: string[]; unset?: string[] }

const hosts = new WeakMap<Element, Map<string, HTMLElement>>()

const unsetOf = new WeakMap<HTMLElement, string[]>()

const hostFor = (root: Element, className: string) => {
  const byClass = hosts.get(root) ?? new Map<string, HTMLElement>()
  hosts.set(root, byClass)
  const existing = byClass.get(className)
  if (existing?.isConnected) return existing
  const host = root.ownerDocument.createElement("div")
  host.className = className
  host.hidden = true
  host.style.color = "transparent"
  host.style.setProperty("forced-color-adjust", "none")
  root.append(host)
  byClass.set(className, host)
  return host
}

const unsetOn = (host: HTMLElement, unset: string[]) => {
  for (const name of unsetOf.get(host) ?? []) {
    if (!unset.includes(name)) host.style.removeProperty(name)
  }
  for (const name of unset) host.style.setProperty(name, "initial")
  unsetOf.set(host, unset)
}

export const probeColors = (root: Element, sets: ProbeSet[]) => {
  const document = root.ownerDocument
  const used = new Map<HTMLElement, number>()
  const probes = sets.map(({ className, colors, unset = [] }) => {
    const host = hostFor(root, className)
    const offset = used.get(host) ?? 0
    used.set(host, offset + colors.length)
    unsetOn(host, unset)
    while (host.children.length < offset + colors.length) {
      host.append(document.createElement("div"))
    }
    return colors.map((color, index) => {
      const probe = host.children[offset + index] as HTMLElement
      probe.style.color = color
      return probe
    })
  })
  const view = document.defaultView!
  return probes.map((row) =>
    row.map((probe) => view.getComputedStyle(probe).color),
  )
}
