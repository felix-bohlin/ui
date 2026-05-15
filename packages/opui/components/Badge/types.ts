import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  alignment?: "start-start" | "end-start" | "end-end"
  class?: HTMLAttributes['class']
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  invisible?: boolean
  label?: string | number
}
