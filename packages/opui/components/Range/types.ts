import type { HTMLAttributes } from 'vue'
export type RangeProps = {
  [key: string]: any
  class?: HTMLAttributes['class']
  disabled?: boolean
  endText?: string
  id?: string
  label?: string
  max?: number | string
  min?: number | string
  name?: string
  spread?: boolean
  startText?: string
  step?: number | string
  value?: number | string
  valueSuffix?: string
  variant?: 'filled' | 'default' | 'tonal'
} & (
  | { list?: never; options?: never }
  | {
      list: string
      options: (string | number | { value: string | number; label?: string })[]
    }
)
