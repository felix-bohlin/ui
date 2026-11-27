import {
  ariaDisabled,
  followControl,
  mirrorDisabled,
} from "./internal/field-part.js"
import { removeOnNullish } from "./internal/nullish.js"

const Base = globalThis.HTMLElement ?? class {}

const TOGGLE = "--toggle-password"

export class PasswordToggleElement extends Base {
  #follow = followControl(this, {
    attributes: ["aria-disabled", "disabled", "type"],
    button: () => this.#toggle(),
    fieldsets: true,
    sync: () => this.#sync(),
  })
  #shown = false

  get input() {
    return this.#follow.control
  }

  connectedCallback() {
    const signal = this.#follow.connect()
    this.getRootNode().addEventListener(
      "command",
      (event) => this.#command(event),
      { capture: true, signal },
    )
    this.#follow.onForm(["reset", "submit"], () => this.hidePassword(), {
      capture: true,
    })
  }

  disconnectedCallback() {
    this.#follow.disconnect()
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
    if (ariaDisabled(this.input)) return
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
    mirrorDisabled(button, input)
  }

  #toggle() {
    return this.querySelector(`button[command="${TOGGLE}"]`)
  }
}

if (globalThis.customElements && !customElements.get("opui-password-toggle")) {
  removeOnNullish(PasswordToggleElement)
  customElements.define("opui-password-toggle", PasswordToggleElement)
}
