const Base = globalThis.HTMLElement ?? class {}

const DELAY = 750
const LABEL = "Characters left: {count}"

let announcer

function announce(text) {
  if (!announcer?.isConnected) return
  announcer.textContent = ""
  requestAnimationFrame(() => {
    announcer.textContent = text
  })
}

function ensureAnnouncer(document) {
  if (announcer?.isConnected) return
  announcer = document.createElement("div")
  announcer.className = "ui-sr-only"
  announcer.dataset.opuiAnnouncer = ""
  announcer.setAttribute("aria-live", "polite")
  document.body.append(announcer)
}

export class CharacterCount extends Base {
  #controller
  #observer
  #timeout

  get field() {
    return this.closest(".ui-text-field, .ui-textarea")?.querySelector(
      "input, textarea",
    )
  }

  connectedCallback() {
    if (!this.hasAttribute("aria-hidden")) {
      this.setAttribute("aria-hidden", "true")
    }
    ensureAnnouncer(this.ownerDocument)
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.ownerDocument.addEventListener(
      "input",
      (event) => {
        if (event.target !== this.field) return
        this.#update()
        this.#schedule()
      },
      { signal },
    )
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.field?.form) setTimeout(() => this.#update())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#update())
    const root = this.closest(".ui-text-field, .ui-textarea")
    if (root) {
      this.#observer.observe(root, {
        attributeFilter: ["maxlength", "value"],
        subtree: true,
      })
    }
    this.#update()
    queueMicrotask(() => this.#update())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    clearTimeout(this.#timeout)
  }

  #remaining() {
    const field = this.field
    if (!field || field.maxLength < 0) return
    return Math.max(0, field.maxLength - field.value.length)
  }

  #schedule() {
    clearTimeout(this.#timeout)
    const field = this.field
    const remaining = this.#remaining()
    if (remaining === undefined) return
    if (remaining > Math.max(10, Math.ceil(field.maxLength / 10))) return
    this.#timeout = setTimeout(() => {
      const label = this.getAttribute("label") ?? LABEL
      announce(label.replace("{count}", String(this.#remaining())))
    }, DELAY)
  }

  #update() {
    const field = this.field
    const text =
      field && field.maxLength >= 0
        ? `${field.value.length}/${field.maxLength}`
        : ""
    const node = this.firstChild
    if (node instanceof Text && !node.nextSibling) node.data = text
    else this.textContent = text
  }
}

if (globalThis.customElements && !customElements.get("opui-character-count")) {
  customElements.define("opui-character-count", CharacterCount)
}
