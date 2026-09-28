import "@solidjs/web"

declare module "@solidjs/web" {
  namespace JSX {
    interface HTMLAttributes<T> {
      interestfor?: string
    }
  }
}
