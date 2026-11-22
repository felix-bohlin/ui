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
        if (this.hasAttribute("data-hydrating")) return
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

const NULLISH_REMOVES = [
  "accessKey",
  "autocapitalize",
  "autocorrect",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "enterKeyHint",
  "id",
  "inputMode",
  "lang",
  "slot",
  "spellcheck",
  "tabIndex",
  "title",
  "translate",
  "writingSuggestions",
]

function removeOnNullish(element) {
  for (const name of NULLISH_REMOVES) {
    let proto = Object.getPrototypeOf(element.prototype)
    while (proto && !Object.hasOwn(proto, name)) {
      proto = Object.getPrototypeOf(proto)
    }
    const descriptor = proto && Object.getOwnPropertyDescriptor(proto, name)
    if (!descriptor?.set) continue
    const attribute = name === "className" ? "class" : name.toLowerCase()
    Object.defineProperty(element.prototype, name, {
      configurable: true,
      get: descriptor.get,
      set(value) {
        if (value == null) this.removeAttribute(attribute)
        else descriptor.set.call(this, value)
      },
    })
  }
}

if (globalThis.customElements && !customElements.get("opui-callout")) {
  removeOnNullish(CalloutElement)
  customElements.define("opui-callout", CalloutElement)
}
