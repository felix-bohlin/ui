const Base = globalThis.HTMLElement ?? class {}

const DISMISS = "--dismiss"
const FOCUSABLE =
  'a[href], area[href], button, iframe, input, select, summary, textarea, [contenteditable]:not([contenteditable="false" i]), [tabindex]'

export class CalloutElement extends Base {
  #controller

  connectedCallback() {
    this.#controller = new AbortController()
    this.addEventListener(
      "command",
      (event) => {
        if (event.command === DISMISS && event.target === this) this.dismiss()
      },
      { signal: this.#controller.signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

  dismiss() {
    const event = new Event("dismiss", { bubbles: true, cancelable: true })
    if (!this.dispatchEvent(event)) return false
    const active = this.ownerDocument.activeElement
    const focused = this.contains(active)
    this.hidden = true
    if (focused) this.#moveFocus(active)
    return true
  }

  #moveFocus(active) {
    const candidates = [
      ...this.ownerDocument.querySelectorAll(FOCUSABLE),
    ].filter((element) => element.tabIndex >= 0 && !this.contains(element))
    const after = candidates.filter(
      (element) =>
        this.compareDocumentPosition(element) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    )
    const before = candidates
      .filter(
        (element) =>
          this.compareDocumentPosition(element) &
          Node.DOCUMENT_POSITION_PRECEDING,
      )
      .reverse()
    for (const element of [...after, ...before]) {
      element.focus()
      if (this.ownerDocument.activeElement === element) return
    }
    active.blur?.()
  }
}

if (globalThis.customElements && !customElements.get("opui-callout")) {
  customElements.define("opui-callout", CalloutElement)
}
