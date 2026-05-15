import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  class?: HTMLAttributes['class']
  variant?: "tonal" | "filled" | "primary"
}
