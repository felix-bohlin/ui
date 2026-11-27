import { followControl } from "./internal/field-part.js"
import { removeOnNullish } from "./internal/nullish.js"

const Base = globalThis.HTMLElement ?? class {}

const DELAY = 750
const LABEL = "Characters left: {count}"

const announcers = new WeakMap()

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

export class CharacterCountElement extends Base {
  #follow = followControl(this, {
    attributes: ["maxlength", "value"],
    sync: () => this.#update(),
    value: true,
  })
  #timeout

  get control() {
    return this.#follow.control
  }

  connectedCallback() {
    if (!this.hasAttribute("aria-hidden")) {
      this.setAttribute("aria-hidden", "true")
    }
    const signal = this.#follow.connect()
    this.getRootNode().addEventListener(
      "input",
      (event) => {
        if (event.target !== this.control) return
        this.#update()
        this.#schedule(announcerOf(event.target))
      },
      { signal },
    )
  }

  disconnectedCallback() {
    this.#follow.disconnect()
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
  removeOnNullish(CharacterCountElement)
  customElements.define("opui-character-count", CharacterCountElement)
}
