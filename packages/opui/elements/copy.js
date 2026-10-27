const Base = globalThis.HTMLElement ?? class {}

const COPIED = 2000

export class Copy extends Base {
  #controller
  #source
  #timeout

  get text() {
    const field = this.querySelector("input, textarea")
    if (field) return field.value
    const clone = this.ownerDocument.createElement("div")
    clone.append(...[...this.childNodes].map((node) => node.cloneNode(true)))
    for (const node of clone.querySelectorAll('button, [role="status"]')) {
      node.remove()
    }
    return clone.textContent.trim()
  }

  connectedCallback() {
    this.#controller = new AbortController()
    this.addEventListener(
      "command",
      (event) => {
        if (event.command === "--copy") void this.copy(event.source)
      },
      { capture: true, signal: this.#controller.signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#reset()
  }

  async copy(source) {
    try {
      await navigator.clipboard.writeText(this.text)
    } catch {
      this.#select()
      return false
    }
    this.#reset()
    const status = this.#status
    requestAnimationFrame(() => {
      if (status)
        status.textContent = this.getAttribute("copied-label") ?? "Copied"
    })
    this.#source = source
    source?.setAttribute("data-copied", "")
    this.#timeout = setTimeout(() => this.#reset(), COPIED)
    return true
  }

  get #status() {
    return this.querySelector(':scope > [role="status"]')
  }

  #reset() {
    clearTimeout(this.#timeout)
    this.#source?.removeAttribute("data-copied")
    this.#source = undefined
    if (this.#status) this.#status.textContent = ""
  }

  #select() {
    const field = this.querySelector("input, textarea")
    if (field) {
      field.select()
      return
    }
    this.ownerDocument.getSelection()?.selectAllChildren(this)
  }
}

if (globalThis.customElements && !customElements.get("opui-copy")) {
  customElements.define("opui-copy", Copy)
}
