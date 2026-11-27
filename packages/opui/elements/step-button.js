import {
  ariaDisabled,
  followControl,
  mirrorDisabled,
} from "./internal/field-part.js"
import { removeOnNullish } from "./internal/nullish.js"

const Base = globalThis.HTMLElement ?? class {}

const COMMANDS = { "--step-down": -1, "--step-up": 1 }
const HOLD_DELAY = 400
const HOLD_INTERVAL = 80

export class StepButtonElement extends Base {
  #follow = followControl(this, {
    attributes: [
      "aria-disabled",
      "disabled",
      "max",
      "min",
      "readonly",
      "value",
    ],
    button: () => this.#button(),
    events: ["focusin", "input", "pointerover"],
    sync: () => this.#sync(),
    value: true,
  })
  #held = false
  #interval
  #timeout

  get input() {
    return this.#follow.control
  }

  connectedCallback() {
    const signal = this.#follow.connect()
    this.addEventListener("click", () => this.#click(), { signal })
    this.addEventListener("keydown", (event) => this.#keydown(event), {
      signal,
    })
    this.addEventListener("pointerdown", (event) => this.#hold(event), {
      signal,
    })
    for (const type of ["lostpointercapture", "pointercancel", "pointerup"]) {
      this.addEventListener(type, () => this.#release(), { signal })
    }
  }

  disconnectedCallback() {
    this.#follow.disconnect()
    this.#release()
  }

  step() {
    const direction = this.#direction()
    const input = this.input
    if (!direction || !input) return
    if (input.disabled || input.readOnly || ariaDisabled(input)) return
    const before = input.value
    try {
      if (direction > 0) input.stepUp()
      else input.stepDown()
    } catch {
      return
    }
    if (input.value === before) return
    input.dispatchEvent(new Event("input", { bubbles: true }))
    input.dispatchEvent(new Event("change", { bubbles: true }))
  }

  #button() {
    return this.querySelector("button[command]")
  }

  #direction() {
    return COMMANDS[this.#button()?.getAttribute("command")]
  }

  #click() {
    if (!this.#held) this.step()
  }

  #keydown(event) {
    if (event.key !== " ") return
    event.preventDefault()
    this.step()
  }

  #hold(event) {
    if (event.button !== 0) return
    this.#release()
    this.#held = false
    this.#button()?.setPointerCapture?.(event.pointerId)
    this.#timeout = setTimeout(() => {
      this.#interval = setInterval(() => {
        this.#held = true
        this.step()
      }, HOLD_INTERVAL)
    }, HOLD_DELAY)
  }

  #release() {
    clearTimeout(this.#timeout)
    clearInterval(this.#interval)
    setTimeout(() => {
      this.#held = false
    })
  }

  #sync() {
    const button = this.#button()
    const input = this.input
    if (!button || !input) return
    const value = input.valueAsNumber
    const atLimit =
      this.#direction() < 0
        ? input.min !== "" && value <= Number(input.min)
        : input.max !== "" && value >= Number(input.max)
    mirrorDisabled(button, input, input.readOnly || atLimit)
  }
}

if (globalThis.customElements && !customElements.get("opui-step-button")) {
  removeOnNullish(StepButtonElement)
  customElements.define("opui-step-button", StepButtonElement)
}
