import type { HTMLAttributes } from 'vue'
export type TextareaProps = {
  [key: string]: any
  autoFit?: boolean
  class?: HTMLAttributes['class']
  cols?: number
  description?: string
  disabled?: boolean
  critical?: boolean
  filled?: boolean
  id?: string
  label?: string
  maxlength?: number
  minlength?: number
  name?: string
  spread?: boolean
  placeholder?: string
  required?: boolean
  rows?: number
  small?: boolean
  endText?: string
  value?: string
}
