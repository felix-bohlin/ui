const Base = globalThis.HTMLElement ?? class {}

const CLOSE_PATH =
  "M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
const ICONS = {
  critical: {
    d: "M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5",
    viewBox: "0 0 48 48",
  },
  info: {
    d: "M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4",
    viewBox: "0 0 32 32",
  },
  success: {
    d: "M22.707 12.707a1 1 0 0 0-1.414-1.414L14.5 18.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0zM16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16",
    viewBox: "0 0 32 32",
  },
  warning: {
    d: "M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z",
    viewBox: "0 0 32 32",
  },
}
const DURATION = 5000
const SEVERITIES = new Set([
  "critical",
  "info",
  "neutral",
  "success",
  "warning",
])
const SVG = "http://www.w3.org/2000/svg"

export class Toaster extends Base {
  #controller
  #focused = false
  #hovered = false
  #timers = new Map()

  get list() {
    return this.querySelector(":scope > ol")
  }

  get status() {
    return this.querySelector(':scope > [role="status"]')
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener(
      "command",
      (event) => {
        if (event.command !== "--toast") return
        const { toast, toastSeverity } = event.source?.dataset ?? {}
        if (toast) this.show(toast, { severity: toastSeverity })
      },
      { capture: true, signal },
    )
    this.addEventListener(
      "click",
      (event) => {
        const item = event.target.closest?.("li")
        if (item && event.target.closest("button")) this.dismiss(item)
      },
      { signal },
    )
    const list = this.list
    list?.addEventListener(
      "keydown",
      (event) => {
        const item = event.target.closest?.("li")
        if (event.key === "Escape" && item) this.dismiss(item)
      },
      { signal },
    )
    list?.addEventListener(
      "focusin",
      () => {
        this.#focused = true
        this.#pause()
      },
      { signal },
    )
    list?.addEventListener(
      "focusout",
      (event) => {
        if (list.contains(event.relatedTarget)) return
        this.#focused = false
        this.#resume()
      },
      { signal },
    )
    list?.addEventListener(
      "pointerenter",
      () => {
        this.#hovered = true
        this.#pause()
      },
      { signal },
    )
    list?.addEventListener(
      "pointerleave",
      () => {
        this.#hovered = false
        this.#resume()
      },
      { signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
    for (const timer of this.#timers.values()) clearTimeout(timer.id)
    this.#timers.clear()
  }

  show(message, { duration, severity } = {}) {
    const list = this.list
    if (!list) return null
    const item = this.ownerDocument.createElement("li")
    item.className = SEVERITIES.has(severity)
      ? `ui-callout ui-${severity}`
      : "ui-callout"
    const content = this.ownerDocument.createElement("div")
    content.className = "ui-content"
    const text = this.ownerDocument.createElement("p")
    text.textContent = message
    content.append(text)
    const icon = this.#icon(severity)
    if (icon) item.append(icon)
    item.append(content, this.#closeButton())
    list.append(item)
    if (!list.matches(":popover-open")) list.showPopover?.()
    this.#announce(message)
    const time = duration ?? (Number(this.getAttribute("duration")) || DURATION)
    this.#timers.set(item, { id: undefined, remaining: time, start: 0 })
    if (!this.#focused && !this.#hovered) this.#start(item)
    return item
  }

  dismiss(item) {
    const list = this.list
    if (!list || !list.contains(item)) return
    clearTimeout(this.#timers.get(item)?.id)
    this.#timers.delete(item)
    const focused = item.contains(this.ownerDocument.activeElement)
    const next = item.nextElementSibling ?? item.previousElementSibling
    item.remove()
    if (focused) next?.querySelector("button")?.focus()
    if (!list.children.length) {
      this.#focused = false
      this.#hovered = false
      if (list.matches(":popover-open")) list.hidePopover()
    }
  }

  #announce(message) {
    const status = this.status
    if (!status) return
    const line = this.ownerDocument.createElement("p")
    line.textContent = message
    status.append(line)
    setTimeout(() => line.remove(), DURATION)
  }

  #icon(severity) {
    const icon = ICONS[severity]
    if (!icon) return null
    const svg = this.ownerDocument.createElementNS(SVG, "svg")
    svg.setAttribute("aria-hidden", "true")
    svg.setAttribute("width", "32")
    svg.setAttribute("height", "32")
    svg.setAttribute("viewBox", icon.viewBox)
    const path = this.ownerDocument.createElementNS(SVG, "path")
    path.setAttribute("fill", "currentColor")
    path.setAttribute("d", icon.d)
    svg.append(path)
    return svg
  }

  #closeButton() {
    const button = this.ownerDocument.createElement("button")
    button.type = "button"
    button.className = "ui-button ui-round ui-small"
    button.setAttribute(
      "aria-label",
      this.getAttribute("close-label") ?? "Close",
    )
    const svg = this.ownerDocument.createElementNS(SVG, "svg")
    svg.setAttribute("aria-hidden", "true")
    svg.setAttribute("width", "32")
    svg.setAttribute("height", "32")
    svg.setAttribute("viewBox", "0 0 32 32")
    const path = this.ownerDocument.createElementNS(SVG, "path")
    path.setAttribute("fill", "currentColor")
    path.setAttribute("d", CLOSE_PATH)
    svg.append(path)
    button.append(svg)
    return button
  }

  #pause() {
    for (const timer of this.#timers.values()) {
      if (timer.id === undefined) continue
      clearTimeout(timer.id)
      timer.id = undefined
      timer.remaining -= performance.now() - timer.start
    }
  }

  #resume() {
    if (this.#focused || this.#hovered) return
    for (const item of this.#timers.keys()) this.#start(item)
  }

  #start(item) {
    const timer = this.#timers.get(item)
    if (!timer || timer.id !== undefined) return
    timer.start = performance.now()
    timer.id = setTimeout(
      () => this.dismiss(item),
      Math.max(0, timer.remaining),
    )
  }
}

export function toast(message, { toaster, ...options } = {}) {
  const element =
    typeof toaster === "string"
      ? document.getElementById(toaster)
      : (toaster ?? document.querySelector("opui-toaster"))
  if (!(element instanceof Toaster)) {
    console.warn("toast(): no <opui-toaster> on the page")
    return null
  }
  return element.show(message, options)
}

for (const severity of SEVERITIES) {
  toast[severity] = (message, options) =>
    toast(message, { ...options, severity })
}

if (globalThis.customElements && !customElements.get("opui-toaster")) {
  customElements.define("opui-toaster", Toaster)
}
