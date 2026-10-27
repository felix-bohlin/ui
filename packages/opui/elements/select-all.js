const Base = globalThis.HTMLElement ?? class {}

const CHECKBOX = 'input[type="checkbox"]'

export class SelectAll extends Base {
  #applying = false
  #controller
  #observer

  get control() {
    return this.querySelector(`${CHECKBOX}[data-select-all]`)
  }

  get items() {
    return [...this.querySelectorAll(CHECKBOX)].filter(
      (input) => !input.hasAttribute("data-select-all") && !input.disabled,
    )
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("change", (event) => this.#change(event), {
      signal,
    })
    for (const type of ["focusin", "pointerover"]) {
      this.addEventListener(type, () => this.sync(), { signal })
    }
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.control?.form) setTimeout(() => this.sync())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.sync())
    this.#observer.observe(this, {
      attributeFilter: ["checked", "data-select-all", "disabled"],
      childList: true,
      subtree: true,
    })
    this.sync()
    queueMicrotask(() => this.sync())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
  }

  sync() {
    const control = this.control
    if (!control || this.#applying) return
    const items = this.items
    const checked = items.filter((input) => input.checked).length
    control.checked = items.length > 0 && checked === items.length
    control.indeterminate = checked > 0 && checked < items.length
  }

  #change(event) {
    if (this.#applying) return
    const control = this.control
    if (control && event.target === control) {
      this.#applying = true
      for (const input of this.items) {
        if (input.checked !== control.checked) input.click()
      }
      this.#applying = false
    }
    this.sync()
  }
}

if (globalThis.customElements && !customElements.get("opui-select-all")) {
  customElements.define("opui-select-all", SelectAll)
}
