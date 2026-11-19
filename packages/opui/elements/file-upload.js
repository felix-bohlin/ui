const Base = globalThis.HTMLElement ?? class {}

const REMOVE = "--remove"
const REMOVE_BUTTON = `[command="${REMOVE}"]`
const ROWS = ":scope > .ui-content > .ui-list > li"

export class FileUploadElement extends Base {
  static observedAttributes = ["data-hydrating"]

  #controller
  #internals
  #observer
  #pending

  get input() {
    return this.querySelector('input[type="file"]')
  }

  connectedCallback() {
    this.#internals ??= this.attachInternals?.()
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("change", (event) => this.#change(event), { signal })
    this.addEventListener("command", (event) => this.#command(event), {
      capture: true,
      signal,
    })
    for (const type of ["dragenter", "dragover"]) {
      this.addEventListener(type, (event) => this.#dragOver(event), { signal })
    }
    this.addEventListener("dragleave", (event) => this.#dragLeave(event), {
      signal,
    })
    this.addEventListener("drop", (event) => this.#drop(event), { signal })
    this.#observer = new MutationObserver(() => this.#restoreFocus())
    this.#observer.observe(this, { childList: true, subtree: true })
    queueMicrotask(() => this.#take())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    this.#pending = undefined
    this.#internals?.states?.delete("drag-over")
  }

  attributeChangedCallback() {
    if (this.isConnected) this.#take()
  }

  #accepts(file, accept) {
    const rules = accept
      .split(",")
      .map((rule) => rule.trim().toLowerCase())
      .filter(Boolean)
    if (rules.length === 0) return true
    const name = file.name.toLowerCase()
    const type = file.type.toLowerCase()
    return rules.some((rule) => {
      if (rule.startsWith(".")) return name.endsWith(rule)
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
      return type === rule
    })
  }

  #select(list) {
    const input = this.input
    if (!input) return
    const accepted = [...(list ?? [])].filter((file) =>
      this.#accepts(file, input.accept),
    )
    const files = input.multiple ? accepted : accepted.slice(0, 1)
    if (files.length === 0) return
    this.dispatchEvent(
      new CustomEvent("select", { bubbles: true, detail: { files } }),
    )
  }

  #take() {
    const input = this.input
    if (!input?.files?.length || this.hasAttribute("data-hydrating")) return
    const files = [...input.files]
    input.value = ""
    this.#select(files)
  }

  #change(event) {
    if (event.target === this.input) this.#take()
  }

  #command(event) {
    if (event.command !== REMOVE || this.hasAttribute("data-hydrating")) return
    const button = event.source
    if (!button || !this.contains(button)) return
    const rows = [...this.querySelectorAll(ROWS)]
    this.#pending = {
      button,
      count: rows.length,
      index: rows.indexOf(button.closest("li")),
    }
    this.dispatchEvent(
      new CustomEvent("remove", {
        bubbles: true,
        detail: { value: button.value },
      }),
    )
  }

  #restoreFocus() {
    const pending = this.#pending
    if (!pending) return
    const rows = [...this.querySelectorAll(ROWS)]
    if (pending.button.isConnected && rows.length >= pending.count) return
    this.#pending = undefined
    if (pending.button.isConnected) return
    const active = this.ownerDocument.activeElement
    if (active && active !== this.ownerDocument.body) return
    const row = rows[pending.index] ?? rows.at(-1)
    const target = row?.querySelector(REMOVE_BUTTON) ?? this.input
    target?.focus()
  }

  #carriesFiles(event) {
    return (
      event.dataTransfer?.types.includes("Files") &&
      this.input &&
      !this.input.matches(":disabled")
    )
  }

  #dragOver(event) {
    if (!this.#carriesFiles(event)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    this.#internals?.states?.add("drag-over")
  }

  #dragLeave(event) {
    if (this.contains(event.relatedTarget)) return
    this.#internals?.states?.delete("drag-over")
  }

  #drop(event) {
    this.#internals?.states?.delete("drag-over")
    if (!this.#carriesFiles(event)) return
    event.preventDefault()
    this.#select(event.dataTransfer.files)
  }
}

if (globalThis.customElements && !customElements.get("opui-file-upload")) {
  customElements.define("opui-file-upload", FileUploadElement)
}
