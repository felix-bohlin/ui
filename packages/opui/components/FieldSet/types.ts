import type { HTMLAttributes } from 'vue'
export type FieldSetProps = {
  [key: string]: any
  as?: 'fieldset' | 'div' | string
  class?: HTMLAttributes['class']
}
