import type { HTMLAttributes } from 'vue'
export type Props = {
  class?: HTMLAttributes['class']
  name?: string
  open?: boolean
  variant?: "default" | "outlined" | "elevated" | "tonal"
  [key: string]: any
}
