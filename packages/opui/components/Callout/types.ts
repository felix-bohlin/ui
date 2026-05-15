import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  class?: HTMLAttributes['class']
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}
