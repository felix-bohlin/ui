import type { HTMLAttributes } from 'vue'
export type FieldLegendProps = {
  [key: string]: any
  as?: 'legend' | 'p' | string
  class?: HTMLAttributes['class']
}
