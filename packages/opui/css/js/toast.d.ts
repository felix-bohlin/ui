export type ToastOptions = {
  closeLabel?: string
  description?: string
  duration?: string
  severity?: "critical" | "info" | "success" | "warning"
  template?: string
  title?: string
}

export function initToastManager(): void
export function showToast(
  options?: ToastOptions,
  manager?: HTMLElement | null,
): void
