const Base = globalThis.HTMLElement ?? class {}

const CLOSE_PATH =
  "M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
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

if (globalThis.customElements && !customElements.get("opui-toaster")) {
  customElements.define("opui-toaster", Toaster)
}
