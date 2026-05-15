import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  "aria-busy"?: "true" | "false" | boolean
  "aria-describedby"?: string
  "aria-label"?: string
  class?: HTMLAttributes['class']
  id?: string
  max?: number | string
  value?: number | string
  variant?: "filled" | "default" | "tonal"
}
