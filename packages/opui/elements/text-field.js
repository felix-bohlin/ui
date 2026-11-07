const Base = globalThis.HTMLElement ?? class {}

const TOGGLE = "--toggle-password"

export class TextField extends Base {
  #controller

  get input() {
    return this.querySelector("input")
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("command", (event) => this.#command(event), {
      capture: true,
      signal,
    })
    for (const type of ["reset", "submit"]) {
      this.ownerDocument.addEventListener(
        type,
        (event) => {
          if (event.target === this.input?.form) this.hidePassword()
        },
        { capture: true, signal },
      )
    }
    this.#sync()
    queueMicrotask(() => this.#sync())
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

  hidePassword() {
    const input = this.input
    if (input?.type === "text" && this.#toggle()) {
      input.type = "password"
      this.#sync()
    }
  }

  showPassword() {
    const input = this.input
    if (input?.type === "password" && this.#toggle()) {
      input.type = "text"
      this.#sync()
    }
  }

  #command(event) {
    if (event.command !== TOGGLE) return
    if (this.input?.type === "password") this.showPassword()
    else this.hidePassword()
  }

  #sync() {
    const button = this.#toggle()
    if (!button || !this.input) return
    button.setAttribute("aria-pressed", String(this.input.type === "text"))
  }

  #toggle() {
    return this.querySelector(`button[command="${TOGGLE}"]`)
  }
}

if (globalThis.customElements && !customElements.get("opui-text-field")) {
  customElements.define("opui-text-field", TextField)
}
