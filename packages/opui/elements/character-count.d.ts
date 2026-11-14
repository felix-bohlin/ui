export declare class CharacterCountElement extends HTMLElement {
  readonly control: HTMLInputElement | HTMLTextAreaElement | null
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-character-count": CharacterCountElement
  }
}
