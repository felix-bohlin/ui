const Base = globalThis.HTMLElement ?? class {}

const DELAY = 750
const LABEL = "Characters left: {count}"

const announcers = new WeakMap()
const watched = new WeakMap()

function announce(announcer, text, lang) {
  announcer.lang = lang
  announcer.textContent = ""
  requestAnimationFrame(() => {
    announcer.textContent = text
  })
}

function announcerOf(control) {
  const dialog = control.closest("dialog")
  const root = dialog ?? control.ownerDocument.body
  let announcer = announcers.get(root)
  if (announcer?.isConnected) return announcer
  announcer = control.ownerDocument.createElement("div")
  announcer.className = "ui-sr-only"
  announcer.dataset.opuiAnnouncer = ""
  announcer.setAttribute("aria-live", "polite")
  if (dialog) dialog.prepend(announcer)
  else root.append(announcer)
  announcers.set(root, announcer)
  return announcer
}

function descriptorOf(object) {
  for (let proto = object; proto; proto = Object.getPrototypeOf(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, "value")
    if (descriptor) return descriptor
  }
}

function watchValue(control, update) {
  let watch = watched.get(control)
  if (!watch) {
    const own = Object.getOwnPropertyDescriptor(control, "value")
    const { get, set } = own ?? descriptorOf(control)
    const updates = new Set()
    const value = {
      configurable: true,
      get() {
        return get.call(this)
      },
      set(next) {
        set.call(this, next)
        for (const each of updates) each()
      },
    }
    let restore
    if (own) {
      Object.defineProperty(control, "value", { ...own, ...value })
      restore = () => {
        if (
          Object.getOwnPropertyDescriptor(control, "value")?.set === value.set
        )
          Object.defineProperty(control, "value", own)
      }
    } else {
      const proto = Object.getPrototypeOf(control)
      function Watched() {}
      Watched.prototype = Object.create(proto, {
        constructor: { configurable: true, value: Watched, writable: true },
        value,
      })
      Object.setPrototypeOf(control, Watched.prototype)
      restore = () => {
        if (Object.getPrototypeOf(control) === Watched.prototype)
          Object.setPrototypeOf(control, proto)
      }
    }
    watch = { restore, updates }
    watched.set(control, watch)
  }
  watch.updates.add(update)
  return () => {
    watch.updates.delete(update)
    if (watch.updates.size) return
    watch.restore()
    watched.delete(control)
  }
}

export class CharacterCountElement extends Base {
  #controller
  #observer
  #timeout
  #unwatch

  get control() {
    return (
      this.closest(".ui-text-field, .ui-textarea")?.querySelector(
        "input, textarea",
      ) ?? null
    )
  }

  connectedCallback() {
    if (!this.hasAttribute("aria-hidden")) {
      this.setAttribute("aria-hidden", "true")
    }
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.ownerDocument.addEventListener(
      "input",
      (event) => {
        if (event.target !== this.control) return
        this.#update()
        this.#schedule(announcerOf(event.target))
      },
      { signal },
    )
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.control?.form)
          setTimeout(() => this.#update())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#update())
    const root = this.closest(".ui-text-field, .ui-textarea")
    if (root) {
      this.#observer.observe(root, {
        attributeFilter: ["maxlength", "value"],
        subtree: true,
      })
    }
    const control = this.control
    if (control) this.#unwatch = watchValue(control, () => this.#update())
    this.#update()
    queueMicrotask(() => this.#update())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    this.#unwatch?.()
    this.#unwatch = undefined
    clearTimeout(this.#timeout)
  }

  #remaining() {
    const control = this.control
    if (!control || control.maxLength < 0) return
    return Math.max(0, control.maxLength - control.value.length)
  }

  #schedule(announcer) {
    clearTimeout(this.#timeout)
    const control = this.control
    const remaining = this.#remaining()
    if (remaining === undefined) return
    if (remaining > Math.max(10, Math.ceil(control.maxLength / 10))) return
    this.#timeout = setTimeout(() => {
      if (!announcer.isConnected) return
      const label = this.getAttribute("label") ?? LABEL
      announce(
        announcer,
        label.replace("{count}", String(this.#remaining())),
        (this.control?.closest("[lang]") ?? this.closest("[lang]"))?.lang ?? "",
      )
    }, DELAY)
  }

  #update() {
    const control = this.control
    const text =
      control && control.maxLength >= 0
        ? `${control.value.length}/${control.maxLength}`
        : ""
    const node = this.firstChild
    if (node instanceof Text && !node.nextSibling) node.data = text
    else this.textContent = text
  }
}

if (globalThis.customElements && !customElements.get("opui-character-count")) {
  customElements.define("opui-character-count", CharacterCountElement)
}
