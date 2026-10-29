const Base = globalThis.HTMLElement ?? class {}

const COPIED = 2000
const TIMEOUT = 2000

export class Copy extends Base {
  #controller
  #interest
  #timeout

  get text() {
    const field = this.querySelector("input, textarea")
    if (field) return field.value
    const clone = this.ownerDocument.createElement("div")
    clone.append(...[...this.childNodes].map((node) => node.cloneNode(true)))
    for (const node of clone.querySelectorAll(
      'button, [popover], [role="status"]',
    )) {
      node.remove()
    }
    return clone.textContent.trim()
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener(
      "command",
      (event) => {
        if (event.command === "--copy") void this.copy(event.source)
      },
      { capture: true, signal },
    )
    this.addEventListener(
      "toggle",
      (event) => {
        if (event.target === this.#label && event.newState === "closed") {
          this.#interest?.abort()
        }
      },
      { capture: true, signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#reset()
  }

  async copy(source) {
    this.#reset()
    const copied = await this.#write(this.text)
    if (!copied) this.#select()
    const message = copied
      ? (this.getAttribute("copied-label") ?? "Copied")
      : (this.getAttribute("failed-label") ?? "Copy failed")
    const status = this.#status
    requestAnimationFrame(() => {
      if (status) status.textContent = message
    })
    this.#show(source, message)
    if (copied) this.#timeout = setTimeout(() => this.#reset(), COPIED)
    return copied
  }

  get #label() {
    return this.querySelector(":scope > .ui-floating[popover]")
  }

  get #status() {
    return this.querySelector(':scope > [role="status"]')
  }

  #reset() {
    clearTimeout(this.#timeout)
    this.#interest?.abort()
    if (this.#label?.matches(":popover-open")) this.#label.hidePopover()
    if (this.#status) this.#status.textContent = ""
  }

  #select() {
    const field = this.querySelector("input, textarea")
    if (field) {
      field.focus()
      field.select()
      return
    }
    this.ownerDocument.getSelection()?.selectAllChildren(this)
  }

  async #write(text) {
    if (!navigator.clipboard?.writeText) return this.#writeWithField(text)
    try {
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, reject) => setTimeout(reject, TIMEOUT)),
      ])
      return true
    } catch {
      return this.#writeWithField(text)
    }
  }

  #writeWithField(text) {
    const { activeElement, body } = this.ownerDocument
    const field = this.ownerDocument.createElement("textarea")
    field.readOnly = true
    field.style.cssText =
      "font-size: 16px; inset-block-start: 0; opacity: 0; position: fixed;"
    field.value = text
    body.append(field)
    field.focus({ preventScroll: true })
    field.setSelectionRange(0, text.length)
    let copied = false
    try {
      copied = this.ownerDocument.execCommand("copy")
    } catch {}
    field.remove()
    activeElement?.focus?.({ preventScroll: true })
    return copied
  }

  #show(source, message) {
    const label = this.#label
    if (!label || !source?.isConnected) return
    const style = getComputedStyle(source)
    label.textContent = message
    label.style.setProperty("--_font-size", style.fontSize)
    label.style.setProperty("--_radius", style.borderStartStartRadius)
    label.showPopover({ source })
    this.#interest = new AbortController()
    source.interestForElement?.addEventListener(
      "beforetoggle",
      (event) => {
        if (event.newState === "open") event.preventDefault()
      },
      { signal: this.#interest.signal },
    )
  }
}

if (globalThis.customElements && !customElements.get("opui-copy")) {
  customElements.define("opui-copy", Copy)
}
