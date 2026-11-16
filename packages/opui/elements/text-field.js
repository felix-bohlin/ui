const Base = globalThis.HTMLElement ?? class {}

const TOGGLE = "--toggle-password"

export class TextFieldElement extends Base {
  #controller
  #observer

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
    this.#observer = new MutationObserver(() => this.#sync())
    this.#observer.observe(this, {
      attributeFilter: ["aria-disabled", "disabled"],
      childList: true,
      subtree: true,
    })
    for (
      let fieldset = this.closest("fieldset");
      fieldset;
      fieldset = fieldset.parentElement?.closest("fieldset")
    ) {
      this.#observer.observe(fieldset, { attributeFilter: ["disabled"] })
    }
    this.#sync()
    queueMicrotask(() => this.#sync())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
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
    if (this.input?.getAttribute("aria-disabled") === "true") return
    if (this.input?.type === "password") this.showPassword()
    else this.hidePassword()
  }

  #sync() {
    const button = this.#toggle()
    const input = this.input
    if (!button || !input) return
    if (input.matches(":disabled")) this.hidePassword()
    button.setAttribute("aria-pressed", String(input.type === "text"))
    if (button.disabled !== input.disabled) button.disabled = input.disabled
    const inert = input.getAttribute("aria-disabled") === "true"
    if (inert !== (button.getAttribute("aria-disabled") === "true")) {
      if (inert) button.setAttribute("aria-disabled", "true")
      else button.removeAttribute("aria-disabled")
    }
  }

  #toggle() {
    return this.querySelector(`button[command="${TOGGLE}"]`)
  }
}

if (globalThis.customElements && !customElements.get("opui-text-field")) {
  customElements.define("opui-text-field", TextFieldElement)
}
