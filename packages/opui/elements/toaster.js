const Base = globalThis.HTMLElement ?? class {}

const DURATION = 5000
const LIMIT = 3
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
  #leaving = new Map()
  #origin = null
  #timers = new Map()

  get alert() {
    return this.querySelector(':scope > [role="alert"]')
  }

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
        if (item && event.target.closest("button") && !event.defaultPrevented) {
          this.dismiss(item)
        }
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
      (event) => {
        if (!list.contains(event.relatedTarget)) {
          this.#origin = event.relatedTarget
        }
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

  show(message, { action, duration, severity } = {}) {
    const list = this.list
    if (!list) return null
    if (
      !this.closest("dialog:modal") &&
      this.ownerDocument.querySelector("dialog:modal")
    ) {
      console.warn(
        `<opui-toaster id="${this.id}">: a modal dialog is open, so this toast is inert and screen readers don't announce it. Put a toaster inside the dialog.`,
      )
    }
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
    item.append(content)
    if (action?.label) item.append(this.#actionButton(action))
    item.append(this.#closeButton())
    list.append(item)
    if (!list.matches(":popover-open")) list.showPopover?.()
    this.#limit(list)
    this.#announce(message, severity)
    const base = Number(this.getAttribute("duration")) || DURATION
    const time = duration ?? (action?.label ? base * 2 : base)
    this.#timers.set(item, { id: undefined, remaining: time, start: 0 })
    if (!this.#focused && !this.#hovered) this.#start(item)
    return item
  }

  dismiss(item) {
    const list = this.list
    if (this.#leaving.has(item)) return this.#leaving.get(item)
    if (!list || !list.contains(item)) return Promise.resolve()
    clearTimeout(this.#timers.get(item)?.id)
    this.#timers.delete(item)
    const focused = item.contains(this.ownerDocument.activeElement)
    const staying = [...list.children].filter(
      (child) => child !== item && !this.#leaving.has(child),
    )
    const next =
      staying.find(
        (child) =>
          item.compareDocumentPosition(child) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ) ?? staying.at(-1)
    item.inert = true
    if (focused) {
      const target = next?.querySelector("button") ?? this.#origin
      if (target?.isConnected) target.focus()
    }
    if (!staying.length) {
      this.#focused = false
      this.#hovered = false
      this.#origin = null
    }
    const left = Promise.allSettled(
      item.getAnimations().map((animation) => animation.finished),
    ).then(() => {
      this.#leaving.delete(item)
      item.remove()
      if (!list.children.length && list.matches(":popover-open")) {
        list.hidePopover()
      }
    })
    this.#leaving.set(item, left)
    return left
  }

  #limit(list) {
    const limit = Number(this.getAttribute("limit")) || LIMIT
    const staying = [...list.children].filter(
      (child) => !this.#leaving.has(child),
    )
    for (const child of staying.slice(0, -limit)) {
      if (!child.contains(this.ownerDocument.activeElement)) this.dismiss(child)
    }
  }

  #announce(message, severity) {
    const region = (severity === "critical" && this.alert) || this.status
    if (!region) return
    const line = this.ownerDocument.createElement("p")
    line.textContent = message
    region.append(line)
    setTimeout(() => line.remove(), DURATION)
  }

  #icon(severity) {
    if (!SEVERITIES.has(severity) || severity === "neutral") return null
    return this.#svg()
  }

  #actionButton({ label, onClick }) {
    const button = this.ownerDocument.createElement("button")
    button.type = "button"
    button.className = "ui-button ui-small"
    button.textContent = label
    if (onClick) button.addEventListener("click", onClick)
    return button
  }

  #closeButton() {
    const button = this.ownerDocument.createElement("button")
    button.type = "button"
    button.className = "ui-button ui-round ui-small"
    button.setAttribute(
      "aria-label",
      this.getAttribute("close-label") ?? "Close",
    )
    button.append(this.#svg())
    return button
  }

  #svg() {
    const svg = this.ownerDocument.createElementNS(SVG, "svg")
    svg.setAttribute("aria-hidden", "true")
    svg.setAttribute("width", "32")
    svg.setAttribute("height", "32")
    return svg
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

function defaultToaster() {
  const modal =
    document.activeElement?.closest("dialog:modal") ??
    document.querySelector("dialog:modal")
  return (
    modal?.querySelector("opui-toaster") ??
    document.querySelector("opui-toaster")
  )
}

export function toast(message, { toaster, ...options } = {}) {
  const element =
    typeof toaster === "string"
      ? document.getElementById(toaster)
      : (toaster ?? defaultToaster())
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
