export declare class SelectAllElement extends HTMLElement {
  readonly control: HTMLInputElement | null
  readonly items: HTMLInputElement[]
  sync(): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-select-all": SelectAllElement
  }
}
