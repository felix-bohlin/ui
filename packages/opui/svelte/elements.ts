declare module "svelte/elements" {
  interface HTMLAttributes<T extends EventTarget> {
    interestfor?: string | undefined | null
  }

  interface SvelteHTMLElements {
    "opui-number-stepper": HTMLAttributes<HTMLElement>
    "opui-select-all": HTMLAttributes<HTMLElement>
    "opui-sortable-table": HTMLAttributes<HTMLElement>
  }
}

export {}
