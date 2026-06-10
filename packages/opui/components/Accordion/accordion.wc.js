import { accordionCSS } from "../../dist/web-components/styles.js"

const BaseElement = typeof HTMLElement !== "undefined" ? HTMLElement : class {}

export class UIAccordion extends BaseElement {
  static get observedAttributes() {
    return ["open", "name", "variant"]
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    // 1. Initial Render & Template
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: contents; }
        ${accordionCSS}
      </style>
      <details class="ui-accordion ui-card">
        <summary id="summary" aria-controls="content">
          <slot name="summary"></slot><slot name="marker"></slot>
        </summary>
        <div id="content" class="ui-content" role="region" aria-labelledby="summary">
          <slot></slot>
        </div>
        <div class="ui-actions" id="actions-wrapper" hidden>
          <slot name="actions"></slot>
        </div>
      </details>
    `

    this.details = this.shadowRoot.querySelector("details")
    const actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]')
    const actionsWrapper = this.shadowRoot.getElementById("actions-wrapper")

    // Show actions wrapper only if slotted content exists
    actionsSlot.addEventListener("slotchange", () => {
      if (actionsSlot.assignedNodes().length > 0) {
        actionsWrapper.removeAttribute("hidden")
      } else {
        actionsWrapper.setAttribute("hidden", "")
      }
    })

    this.updateAttributes()

    // 2. Sync internal state back up to Host element
    this.details.addEventListener("toggle", () => {
      this.toggleAttribute("open", this.details.open)
      this.dispatchEvent(new Event("toggle", { bubbles: true }))
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.details) {
      this.updateAttributes()
    }
  }

  updateAttributes() {
    if (this.hasAttribute("open")) this.details.setAttribute("open", "")
    else this.details.removeAttribute("open")

    if (this.hasAttribute("name"))
      this.details.setAttribute("name", this.getAttribute("name"))
    else this.details.removeAttribute("name")

    const variant = this.getAttribute("variant")
    if (variant) this.details.className = `ui-accordion ui-card ui-${variant}`
    else this.details.className = `ui-accordion ui-card`
  }

  get open() {
    return this.hasAttribute("open")
  }

  set open(value) {
    if (value) {
      this.setAttribute("open", "")
    } else {
      this.removeAttribute("open")
    }
  }

  get name() {
    return this.getAttribute("name")
  }

  set name(value) {
    if (value) {
      this.setAttribute("name", value)
    } else {
      this.removeAttribute("name")
    }
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("ui-accordion")
) {
  customElements.define("ui-accordion", UIAccordion)
}
