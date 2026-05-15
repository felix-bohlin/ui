export type Item = {
  text: string
  value: any
}

export type SelectProps = {
  [key: string]: any
  class?: string
  description?: string
  disabled?: boolean
  critical?: boolean
  dense?: boolean
  id?: string
  items?: Item[]
  label?: string
  name?: string
  spread?: boolean
  required?: boolean
  size?: 'small'
  endText?: string
  value?: any
  variant?: 'outlined' | 'filled'
}
