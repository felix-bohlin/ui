const Base = globalThis.HTMLElement ?? class {}

const COMMANDS = { "--step-down": -1, "--step-up": 1 }
const HOLD_DELAY = 400
const HOLD_INTERVAL = 80

export class StepButtonElement extends Base {
  #controller
  #held = false
  #interval
  #observer
  #timeout

  get input() {
    const id = this.#button()?.getAttribute("commandfor")
    const input = id ? this.getRootNode().getElementById?.(id) : null
    return input instanceof HTMLInputElement ? input : null
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
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
    const field = this.closest(".ui-field") ?? this.parentNode
    for (const type of ["focusin", "input", "pointerover"]) {
      field.addEventListener(type, () => this.#sync(), { signal })
    }
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.input?.form) setTimeout(() => this.#sync())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#sync())
    this.#observer.observe(field, {
      attributeFilter: [
        "aria-disabled",
        "disabled",
        "max",
        "min",
        "readonly",
        "value",
      ],
      childList: true,
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

  step() {
    const direction = this.#direction()
    const input = this.input
    if (!direction || !input) return
    if (input.disabled || input.readOnly || this.#inert(input)) return
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

  #inert(element) {
    return element.getAttribute("aria-disabled") === "true"
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
    if (button.disabled !== input.disabled) button.disabled = input.disabled
    const inert = input.readOnly || atLimit || this.#inert(input)
    if (inert !== this.#inert(button)) {
      if (inert) button.setAttribute("aria-disabled", "true")
      else button.removeAttribute("aria-disabled")
    }
  }
}

if (globalThis.customElements && !customElements.get("opui-step-button")) {
  customElements.define("opui-step-button", StepButtonElement)
}
