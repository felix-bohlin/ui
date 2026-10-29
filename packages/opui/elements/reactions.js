const Base = globalThis.HTMLElement ?? class {}

const CHECKBOX = 'input[type="checkbox"]'

export class Reactions extends Base {
  #controller

  get group() {
    return this.querySelector(":scope > .ui-toggle-group")
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener(
      "click",
      (event) => {
        const input = event.target
        if (!input.matches?.(CHECKBOX)) return
        event.preventDefault()
        this.#request(input.value, input.checked)
      },
      { signal },
    )
    this.addEventListener(
      "command",
      (event) => {
        const value = event.source?.value
        if (event.command !== "--react" || !value) return
        event.source.closest(":popover-open")?.hidePopover()
        this.#request(value, !this.#input(value)?.checked)
      },
      { signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

  announce(message) {
    const status = this.querySelector(':scope > [role="status"]')
    if (!status) return
    status.textContent = ""
    requestAnimationFrame(() => {
      status.textContent = message
    })
  }

  delete(value) {
    const pill = this.#input(value)?.closest(".ui-toggle-button")
    if (!pill) return
    const focused = pill.contains(this.ownerDocument.activeElement)
    const pills = [...(this.group?.querySelectorAll(".ui-toggle-button") ?? [])]
    const index = pills.indexOf(pill)
    pill.remove()
    if (!focused) return
    const next =
      pills[index + 1] ??
      pills[index - 1] ??
      this.closest(".ui-message")?.querySelector(
        ":scope > .ui-actions :is(a, button)",
      )
    ;(next?.querySelector(CHECKBOX) ?? next)?.focus()
  }

  set(value, { checked, label, text } = {}) {
    let input = this.#input(value)
    if (!input) {
      const group = this.group
      if (!group) return
      const document = this.ownerDocument
      const pill = document.createElement("label")
      pill.className = "ui-toggle-button"
      input = document.createElement("input")
      const name = group.querySelector(CHECKBOX)?.name
      if (name) input.name = name
      input.type = "checkbox"
      input.value = value
      const visible = document.createElement("span")
      visible.setAttribute("aria-hidden", "true")
      pill.append(input, visible)
      group.append(pill)
    }
    if (checked !== undefined) input.checked = checked
    if (label !== undefined) input.setAttribute("aria-label", label)
    if (text !== undefined) {
      const visible = input
        .closest(".ui-toggle-button")
        ?.querySelector(':scope > [aria-hidden="true"]')
      if (visible) visible.textContent = text
    }
  }

  #input(value) {
    return [...this.querySelectorAll(CHECKBOX)].find(
      (input) => input.value === value,
    )
  }

  #request(value, checked) {
    this.dispatchEvent(
      new CustomEvent("reaction", {
        bubbles: true,
        detail: { checked, value },
      }),
    )
  }
}

if (globalThis.customElements && !customElements.get("opui-reactions")) {
  customElements.define("opui-reactions", Reactions)
}
