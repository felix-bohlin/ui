export declare class Command extends HTMLElement {
  readonly activeOption: HTMLElement | null
  readonly input: HTMLInputElement | null
  readonly list: HTMLElement | null
  readonly options: HTMLElement[]
  setActive(option: HTMLElement | null, options?: { scroll?: boolean }): void
}
