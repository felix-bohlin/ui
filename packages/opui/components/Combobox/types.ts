export type Props = {
  description?: string
  disabled?: boolean
  endText?: string
  error?: boolean
  items?: Item[]
  label?: string
  multiple?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  size?: "small"
  spread?: boolean
  value?: string | string[]
  variant?: "outlined" | "filled"
}

export type Item = {
  disabled?: boolean
  text: string
  value: string
}

export type Slots<S> = {
  children?: S
  description?: string | S
  endText?: string | S
  label?: string | S
}
