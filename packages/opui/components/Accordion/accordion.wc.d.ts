import type { Props } from "./types"

export interface UIAccordionElement extends HTMLElement, Props {
  open: boolean
  name?: string
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-accordion": UIAccordionElement
  }
}
