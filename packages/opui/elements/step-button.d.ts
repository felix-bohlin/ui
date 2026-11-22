export declare class StepButtonElement extends HTMLElement {
  readonly input: HTMLInputElement | null
  step(): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-step-button": StepButtonElement
  }
}
