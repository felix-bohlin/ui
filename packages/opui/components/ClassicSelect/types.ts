import type { HTMLAttributes } from 'vue'
export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  [key: string]: any
  class?: HTMLAttributes['class']
  disabled?: boolean
  critical?: boolean
  id?: string
  items?: Item[]
  label?: string
  name?: string
  required?: boolean
  size?: 'small'
  endText?: string
  value?: any
  variant?: 'outlined' | 'filled'
}
