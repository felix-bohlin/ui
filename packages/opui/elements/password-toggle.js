const Base = globalThis.HTMLElement ?? class {}

const TOGGLE = "--toggle-password"

export class PasswordToggleElement extends Base {
  #controller
  #observer
  #shown = false

  get input() {
    const id = this.#toggle()?.getAttribute("commandfor")
    const input = id ? this.getRootNode().getElementById?.(id) : null
    return input instanceof HTMLInputElement ? input : null
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    const root = this.getRootNode()
    root.addEventListener("command", (event) => this.#command(event), {
      capture: true,
      signal,
    })
    for (const type of ["reset", "submit"]) {
      root.addEventListener(
        type,
        (event) => {
          if (event.target === this.input?.form) this.hidePassword()
        },
        { capture: true, signal },
      )
    }
    this.#observer = new MutationObserver(() => this.#sync())
    this.#observer.observe(this.closest(".ui-field") ?? this.parentNode, {
      attributeFilter: ["aria-disabled", "disabled", "type"],
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
    this.#shown = false
    if (input?.type === "text" && this.#toggle()) {
      input.type = "password"
      this.#sync()
    }
  }

  showPassword() {
    const input = this.input
    if (input?.type === "password" && this.#toggle()) {
      this.#shown = true
      input.type = "text"
      this.#sync()
    }
  }

  #command(event) {
    if (event.command !== TOGGLE || event.source !== this.#toggle()) return
    if (this.input?.getAttribute("aria-disabled") === "true") return
    if (this.input?.type === "password") this.showPassword()
    else this.hidePassword()
  }

  #sync() {
    const button = this.#toggle()
    const input = this.input
    if (!button || !input) return
    if (input.matches(":disabled")) this.hidePassword()
    else if (this.#shown && input.type === "password") input.type = "text"
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

if (globalThis.customElements && !customElements.get("opui-password-toggle")) {
  customElements.define("opui-password-toggle", PasswordToggleElement)
}
