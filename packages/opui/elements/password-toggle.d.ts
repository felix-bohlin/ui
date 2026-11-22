export declare class PasswordToggleElement extends HTMLElement {
  readonly input: HTMLInputElement | null
  hidePassword(): void
  showPassword(): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-password-toggle": PasswordToggleElement
  }
}
