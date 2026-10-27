const Base = globalThis.HTMLElement ?? class {}

const COMMANDS = { "--step-down": -1, "--step-up": 1 }
const HOLD_DELAY = 400
const HOLD_INTERVAL = 80

export class NumberStepper extends Base {
  #controller
  #held = false
  #interval
  #observer
  #timeout

  get input() {
    return this.querySelector('input[type="number"]')
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("command", (event) => this.#command(event), {
      capture: true,
      signal,
    })
    for (const type of ["focusin", "input", "pointerover"]) {
      this.addEventListener(type, () => this.#sync(), { signal })
    }
    this.addEventListener("pointerdown", (event) => this.#hold(event), {
      signal,
    })
    for (const type of ["lostpointercapture", "pointercancel", "pointerup"]) {
      this.addEventListener(type, () => this.#release(), { signal })
    }
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.input?.form) setTimeout(() => this.#sync())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#sync())
    this.#observer.observe(this, {
      attributeFilter: ["disabled", "max", "min", "readonly", "value"],
      subtree: true,
    })
    this.#sync()
    queueMicrotask(() => this.#sync())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    this.#release()
  }

  step(direction) {
    const input = this.input
    if (!input || input.disabled || input.readOnly) return
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

  #button(command) {
    return this.querySelector(`button[command="${command}"]`)
  }

  #command(event) {
    const direction = COMMANDS[event.command]
    if (direction && !this.#held) this.step(direction)
  }

  #hold(event) {
    const button = event.target.closest?.("button[command]")
    const direction = COMMANDS[button?.getAttribute("command")]
    if (!direction || event.button !== 0) return
    this.#release()
    this.#held = false
    button.setPointerCapture?.(event.pointerId)
    this.#timeout = setTimeout(() => {
      this.#interval = setInterval(() => {
        this.#held = true
        this.step(direction)
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
    const input = this.input
    if (!input) return
    const value = input.valueAsNumber
    const locked = input.disabled || input.readOnly
    const limits = {
      "--step-down": input.min !== "" && value <= Number(input.min),
      "--step-up": input.max !== "" && value >= Number(input.max),
    }
    for (const [command, atLimit] of Object.entries(limits)) {
      const button = this.#button(command)
      if (!button) continue
      if (locked || atLimit) button.setAttribute("aria-disabled", "true")
      else button.removeAttribute("aria-disabled")
    }
  }
}

if (globalThis.customElements && !customElements.get("opui-number-stepper")) {
  customElements.define("opui-number-stepper", NumberStepper)
}
