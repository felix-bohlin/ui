import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  alignment?: string
  class?: HTMLAttributes['class']
  id?: string
  trigger?: "always" | "hover"
}
