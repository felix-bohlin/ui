export declare class CalloutElement extends HTMLElement {
  dismiss(): boolean
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-callout": CalloutElement
  }
}
