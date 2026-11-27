import { removeOnNullish } from "./internal/nullish.js"

const Base = globalThis.HTMLElement ?? class {}

const CHECKBOX = 'input[type="checkbox"]'

const WATCH = Symbol.for("opui-checked-watch")

function descriptorOf(object) {
  for (let proto = object; proto; proto = Object.getPrototypeOf(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, "checked")
    if (descriptor) return descriptor
  }
}

function watchChecked(input, update) {
  let watch = input[WATCH]
  if (!watch) {
    const own = Object.getOwnPropertyDescriptor(input, "checked")
    const { get, set } = own ?? descriptorOf(input)
    const updates = new Set()
    const checked = {
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
      Object.defineProperty(input, "checked", { ...own, ...checked })
      restore = () => {
        if (
          Object.getOwnPropertyDescriptor(input, "checked")?.set === checked.set
        )
          Object.defineProperty(input, "checked", own)
      }
    } else {
      const proto = Object.getPrototypeOf(input)
      function Watched() {}
      Watched.prototype = Object.create(proto, {
        checked,
        constructor: { configurable: true, value: Watched, writable: true },
      })
      Object.setPrototypeOf(input, Watched.prototype)
      restore = () => {
        if (Object.getPrototypeOf(input) === Watched.prototype)
          Object.setPrototypeOf(input, proto)
      }
    }
    watch = { restore, updates }
    input[WATCH] = watch
  }
  watch.updates.add(update)
  return () => {
    watch.updates.delete(update)
    if (watch.updates.size) return
    watch.restore()
    delete input[WATCH]
  }
}

export class SelectAllElement extends Base {
  #applying = false
  #controller
  #observer
  #scheduled = false
  #watched = new Map()

  get control() {
    return this.querySelector(`${CHECKBOX}[data-select-all]`)
  }

  get items() {
    return [...this.querySelectorAll(CHECKBOX)].filter(
      (input) =>
        !input.hasAttribute("data-select-all") && !input.matches(":disabled"),
    )
  }

  connectedCallback() {
    this.#controller = new AbortController()
    const { signal } = this.#controller
    this.addEventListener("change", (event) => this.#change(event), {
      signal,
    })
    this.ownerDocument.addEventListener(
      "reset",
      (event) => {
        if (event.target === this.control?.form) setTimeout(() => this.sync())
      },
      { signal },
    )
    this.#observer = new MutationObserver(() => this.#watch())
    this.#observer.observe(this, {
      attributeFilter: ["checked", "data-select-all", "disabled"],
      childList: true,
      subtree: true,
    })
    this.#watch()
    queueMicrotask(() => this.sync())
  }

  disconnectedCallback() {
    this.#controller?.abort()
    this.#observer?.disconnect()
    for (const unwatch of this.#watched.values()) unwatch()
    this.#watched.clear()
  }

  sync() {
    const control = this.control
    if (!control || this.#applying) return
    const items = this.items
    const checked = items.filter((input) => input.checked).length
    control.checked = items.length > 0 && checked === items.length
    control.indeterminate = checked > 0 && checked < items.length
  }

  #schedule() {
    if (this.#scheduled) return
    this.#scheduled = true
    queueMicrotask(() => {
      this.#scheduled = false
      this.sync()
    })
  }

  #watch() {
    const inputs = new Set(
      [...this.querySelectorAll(CHECKBOX)].filter(
        (input) => !input.hasAttribute("data-select-all"),
      ),
    )
    for (const [input, unwatch] of this.#watched) {
      if (inputs.has(input)) continue
      unwatch()
      this.#watched.delete(input)
    }
    for (const input of inputs) {
      if (this.#watched.has(input)) continue
      this.#watched.set(
        input,
        watchChecked(input, () => this.#schedule()),
      )
    }
    this.sync()
  }

  #change(event) {
    if (this.#applying) return
    const control = this.control
    if (control && event.target === control) {
      this.#applying = true
      for (const input of this.items) {
        if (input.checked !== control.checked) input.click()
      }
      this.#applying = false
    }
    this.sync()
  }
}

if (globalThis.customElements && !customElements.get("opui-select-all")) {
  removeOnNullish(SelectAllElement)
  customElements.define("opui-select-all", SelectAllElement)
}
