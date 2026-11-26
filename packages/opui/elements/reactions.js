const Base = globalThis.HTMLElement ?? class {}

const CHECKBOX = 'input[type="checkbox"]'
const PILL = ".ui-toggle-button"

export class ReactionsElement extends Base {
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
        if (!input.matches?.(CHECKBOX) || !this.group?.contains(input)) return
        event.preventDefault()
        if (this.hasAttribute("data-hydrating")) return
        const { checked, value } = input
        setTimeout(() => this.#request(value, checked))
      },
      { signal },
    )
    this.addEventListener(
      "command",
      (event) => {
        const value = event.source?.value
        if (event.command !== "--react" || !value) return
        if (this.hasAttribute("data-hydrating")) return
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
    const pill = this.#input(value)?.closest(PILL)
    if (!pill) return
    if (value === this.getAttribute("quick-value")) {
      this.#fill(value, {
        checked: false,
        label: this.getAttribute("quick-label") ?? undefined,
        text: this.getAttribute("quick-text") ?? undefined,
      })
      pill.classList.add("ui-unused")
      return
    }
    const focused = pill.contains(this.ownerDocument.activeElement)
    const pills = [...(this.group?.querySelectorAll(PILL) ?? [])]
    const index = pills.indexOf(pill)
    pill.remove()
    if (!focused) return
    const next =
      pills[index + 1] ??
      pills[index - 1] ??
      this.querySelector(":scope > :is(a, button)") ??
      this.closest(".ui-message")?.querySelector(
        ":scope > .ui-actions :is(a, button)",
      )
    ;(next?.querySelector(CHECKBOX) ?? next)?.focus()
  }

  set(value, reaction) {
    this.#fill(value, reaction)?.classList.remove("ui-unused")
  }

  #fill(value, { checked, label, text } = {}) {
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
      if (value === this.getAttribute("quick-value")) group.prepend(pill)
      else group.append(pill)
    }
    const pill = input.closest(PILL)
    if (checked !== undefined) input.checked = checked
    if (label !== undefined) input.setAttribute("aria-label", label)
    if (text !== undefined) {
      const visible = pill?.querySelector(':scope > [aria-hidden="true"]')
      if (visible) visible.textContent = text
    }
    return pill
  }

  #input(value) {
    return [...(this.group?.querySelectorAll(CHECKBOX) ?? [])].find(
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

const NULLISH_REMOVES = [
  "accessKey",
  "autocapitalize",
  "autocorrect",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "enterKeyHint",
  "id",
  "inputMode",
  "lang",
  "slot",
  "spellcheck",
  "tabIndex",
  "title",
  "translate",
  "writingSuggestions",
]

function removeOnNullish(element) {
  for (const name of NULLISH_REMOVES) {
    let proto = Object.getPrototypeOf(element.prototype)
    while (proto && !Object.hasOwn(proto, name)) {
      proto = Object.getPrototypeOf(proto)
    }
    const descriptor = proto && Object.getOwnPropertyDescriptor(proto, name)
    if (!descriptor?.set) continue
    const attribute = name === "className" ? "class" : name.toLowerCase()
    Object.defineProperty(element.prototype, name, {
      configurable: true,
      get: descriptor.get,
      set(value) {
        if (value == null) this.removeAttribute(attribute)
        else descriptor.set.call(this, value)
      },
    })
  }
}

if (globalThis.customElements && !customElements.get("opui-reactions")) {
  removeOnNullish(ReactionsElement)
  customElements.define("opui-reactions", ReactionsElement)
}
