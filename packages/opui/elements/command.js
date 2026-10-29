const Base = globalThis.HTMLElement ?? class {}

const OPTION = ".ui-list > li > :is(a[href], button)"

let count = 0

const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

const ensureId = (element) => {
  if (!element.id) element.id = `opui-command-${++count}`
  return element.id
}

export class Command extends Base {
  static observedAttributes = ["empty-label", "filter"]

  #active = null
  #controller
  #observer

  get input() {
    return this.querySelector(":scope > .ui-header > input")
  }

  get list() {
    return this.querySelector(":scope > .ui-content")
  }

  get options() {
    const list = this.list
    return [...(list?.querySelectorAll(OPTION) ?? [])].filter((option) => {
      const hidden = option.closest("[hidden]")
      return (
        !(hidden && list.contains(hidden)) &&
        !option.disabled &&
        option.getAttribute("aria-disabled") !== "true"
      )
    })
  }

  get activeOption() {
    return this.#active?.isConnected ? this.#active : null
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener(
      "input",
      (event) => {
        if (event.target === this.input) this.#filter({ reset: true })
      },
      { signal },
    )
    this.addEventListener(
      "keydown",
      (event) => {
        if (event.target === this.input) this.#keydown(event)
      },
      { signal },
    )
    this.addEventListener(
      "pointermove",
      (event) => {
        const option = event.target.closest?.(OPTION)
        if (option && option !== this.activeOption && this.#owns(option)) {
          this.setActive(option, { scroll: false })
        }
      },
      { signal },
    )
    this.addEventListener(
      "mousedown",
      (event) => {
        const option = event.target.closest?.(OPTION)
        if (option && this.#owns(option)) event.preventDefault()
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => {
      this.#upgrade()
      this.#filter()
    })
    this.#observer.observe(this, { childList: true, subtree: true })
    this.#upgrade()
    this.#filter()
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
  }

  attributeChangedCallback() {
    if (this.#controller) this.#filter()
  }

  setActive(option, { scroll = true } = {}) {
    const input = this.input
    const previous = this.activeOption
    if (previous && previous !== option) {
      previous.setAttribute("aria-selected", "false")
    }
    this.#active = option ?? null
    if (!option) {
      input?.removeAttribute("aria-activedescendant")
      return
    }
    option.setAttribute("aria-selected", "true")
    input?.setAttribute("aria-activedescendant", ensureId(option))
    if (scroll) option.scrollIntoView({ block: "nearest" })
  }

  #owns(element) {
    return element.closest(".ui-command") === this
  }

  #upgrade() {
    const input = this.input
    const list = this.list
    if (!list) return
    ensureId(list)
    list.setAttribute("role", "listbox")
    if (
      input &&
      !list.hasAttribute("aria-label") &&
      !list.hasAttribute("aria-labelledby")
    ) {
      for (const name of ["aria-label", "aria-labelledby"]) {
        const value = input.getAttribute(name)
        if (value) list.setAttribute(name, value)
      }
    }
    if (input) {
      input.setAttribute("role", "combobox")
      input.setAttribute("aria-autocomplete", "list")
      input.setAttribute("aria-controls", list.id)
      if (!input.hasAttribute("autocomplete")) {
        input.setAttribute("autocomplete", "off")
      }
    }
    for (const group of list.querySelectorAll(".ui-list")) {
      if (group.getAttribute("role") !== "group") {
        group.setAttribute("role", "group")
      }
      for (const item of group.children) {
        if (item.localName === "li" && item.getAttribute("role") !== "none") {
          item.setAttribute("role", "none")
        }
      }
    }
    for (const option of list.querySelectorAll(OPTION)) {
      if (option.getAttribute("role") === "option") continue
      option.setAttribute("role", "option")
      option.setAttribute("tabindex", "-1")
      option.setAttribute("aria-selected", "false")
      if (option.disabled) option.setAttribute("aria-disabled", "true")
      ensureId(option)
    }
  }

  #filter({ reset = false } = {}) {
    const input = this.input
    const list = this.list
    if (!list) return
    const query = input?.value.trim() ?? ""
    if (this.getAttribute("filter") !== "none") {
      const words = normalize(query).split(/\s+/).filter(Boolean)
      for (const option of list.querySelectorAll(OPTION)) {
        const text = normalize(
          `${option.textContent} ${option.dataset.keywords ?? ""}`,
        )
        const item = option.parentElement
        const hidden = !words.every((word) => text.includes(word))
        if (item.hidden !== hidden) item.hidden = hidden
      }
      for (const group of list.querySelectorAll(".ui-command-group")) {
        const hidden = !group.querySelector(".ui-list > li:not([hidden])")
        if (group.hidden !== hidden) group.hidden = hidden
      }
    }
    const options = this.options
    this.setActive(
      !reset && options.includes(this.activeOption)
        ? this.activeOption
        : options[0],
    )
    input?.setAttribute("aria-expanded", String(options.length > 0))
    const status = this.querySelector(':scope > p[role="status"]')
    const empty =
      query && options.length === 0
        ? (this.getAttribute("empty-label") ?? "No results")
        : ""
    if (status && status.textContent !== empty) status.textContent = empty
  }

  #keydown(event) {
    if (event.isComposing) return
    const options = this.options
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      if (options.length === 0) return
      const index = options.indexOf(this.activeOption)
      const next =
        event.key === "ArrowDown"
          ? options[(index + 1) % options.length]
          : options[(index - 1 + options.length) % options.length]
      this.setActive(next)
    } else if (event.key === "Enter") {
      const option = this.activeOption
      if (!option) return
      event.preventDefault()
      option.dispatchEvent(
        new MouseEvent("click", {
          altKey: event.altKey,
          bubbles: true,
          cancelable: true,
          ctrlKey: event.ctrlKey,
          metaKey: event.metaKey,
          shiftKey: event.shiftKey,
          view: this.ownerDocument.defaultView,
        }),
      )
    }
  }
}

if (globalThis.customElements && !customElements.get("opui-command")) {
  customElements.define("opui-command", Command)
}
