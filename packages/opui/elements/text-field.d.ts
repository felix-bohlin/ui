export declare class TextFieldElement extends HTMLElement {
  readonly input: HTMLInputElement | null
  hidePassword(): void
  showPassword(): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-text-field": TextFieldElement
  }
}
