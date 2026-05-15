import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  alt?: string
  as?: "div" | "a" | "button" | string
  class?: HTMLAttributes['class']
  href?: string
  isGroup?: boolean
  spacing?: "small" | "x-small"
  src?: string
  variant?: "squared" | "rounded" | "squircle"
}
