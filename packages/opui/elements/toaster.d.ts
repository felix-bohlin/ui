export type ToastOptions = {
  duration?: number
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
}

export declare class Toaster extends HTMLElement {
  readonly list: HTMLOListElement | null
  readonly status: HTMLElement | null
  dismiss(item: HTMLLIElement): void
  show(message: string, options?: ToastOptions): HTMLLIElement | null
}
