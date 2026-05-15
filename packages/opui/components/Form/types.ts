import type { HTMLAttributes } from 'vue'
export type FormProps = {
  [key: string]: any
  as?: 'form' | 'div' | string
  class?: HTMLAttributes['class']
}
