type ToastOptions = {
  description?: string
  duration?: string
  severity?: "critical" | "info" | "loading" | "success" | "warning"
}

type ToastHandle = {
  dismiss: () => void
  update: (options: ToastOptions & { title?: string }) => ToastHandle
}

type ToastMessage<T> = string | ((value: T) => string)

export declare const toast: {
  (title: string, options?: ToastOptions): ToastHandle
  promise: <T>(
    promise: Promise<T>,
    messages: {
      error: ToastMessage<unknown>
      loading: string
      success: ToastMessage<T>
    },
  ) => Promise<T>
}

export declare function initToastManager(): HTMLElement

declare global {
  interface Window {
    showToast: (options?: ToastOptions & { title?: string }) => ToastHandle
  }
}
