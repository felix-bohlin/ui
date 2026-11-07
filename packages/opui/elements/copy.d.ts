export declare class Copy extends HTMLElement {
  readonly text: string
  copy(source?: Element | null): Promise<boolean>
}
