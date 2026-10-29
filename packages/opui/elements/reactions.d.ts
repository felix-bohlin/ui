export type ReactionDetail = {
  checked: boolean
  value: string
}

export type Reaction = {
  checked?: boolean
  label?: string
  text?: string
}

export declare class Reactions extends HTMLElement {
  readonly group: HTMLElement | null
  announce(message: string): void
  delete(value: string): void
  set(value: string, reaction?: Reaction): void
}
