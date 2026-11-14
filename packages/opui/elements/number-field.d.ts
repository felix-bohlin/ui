export declare class NumberFieldElement extends HTMLElement {
  readonly input: HTMLInputElement | null
  stepDown(): void
  stepUp(): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-number-field": NumberFieldElement
  }
}
