import type { HTMLAttributes } from 'vue'
export type SwitchProps = {
  [key: string]: any
  checked?: boolean
  class?: HTMLAttributes['class']
  disabled?: boolean
  critical?: boolean
  hideLabel?: boolean
  id?: string
  name?: string
  required?: boolean
  small?: boolean
  spread?: boolean
  stack?: boolean
  value?: string
}

export type SwitchInputProps = {
  [key: string]: any
  checked?: boolean
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  value?: string
}
