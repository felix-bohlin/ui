export type TextFieldProps = {
  [key: string]: any
  autoFit?: boolean
  class?: string
  critical?: boolean
  description?: string
  disabled?: boolean
  endText?: string
  filled?: boolean
  id?: string
  label?: string
  list?: string
  max?: number | string
  min?: number | string
  name?: string
  placeholder?: string
  required?: boolean
  small?: boolean
  spread?: boolean
  startText?: string
  step?: number | string
  type?:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'numeric'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  value?: string | number
}
