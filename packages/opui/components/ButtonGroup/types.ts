import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  class?: HTMLAttributes['class']
  color?: "critical" | "primary"
  orientation?: "vertical"
  size?: "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
}
