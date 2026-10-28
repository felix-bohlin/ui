export type ToastSeverity =
  "critical" | "info" | "neutral" | "success" | "warning"

export type ToastOptions = {
  duration?: number
  severity?: ToastSeverity
}

export declare class Toaster extends HTMLElement {
  readonly list: HTMLOListElement | null
  readonly status: HTMLElement | null
  dismiss(item: HTMLLIElement): void
  show(message: string, options?: ToastOptions): HTMLLIElement | null
}

type Target = { toaster?: string | Toaster }

export declare const toast: ((
  message: string,
  options?: ToastOptions & Target,
) => HTMLLIElement | null) &
  Record<
    ToastSeverity,
    (
      message: string,
      options?: Omit<ToastOptions, "severity"> & Target,
    ) => HTMLLIElement | null
  >
