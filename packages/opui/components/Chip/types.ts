import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  as?: "a" | "button" | "div" | string
  class?: HTMLAttributes['class']
  label?: string
  multiline?: boolean
  size?: "small"
  variant?: "tonal" | "outlined"
}
