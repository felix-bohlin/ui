import type { HTMLAttributes } from 'vue'
export type Props = {
  [key: string]: any
  alignment?: string
  arrow?: boolean
  class?: HTMLAttributes['class']
  id?: string
  label?: string
}
