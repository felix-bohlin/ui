export declare class CopyElement extends HTMLElement {
  readonly text: string
  copy(source?: Element | null): Promise<boolean>
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-copy": CopyElement
  }
}
