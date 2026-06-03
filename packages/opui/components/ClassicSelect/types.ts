export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  [key: string]: any
  disabled?: boolean
  error?: boolean
  id?: string
  items?: Item[]
  label?: string
  name?: string
  required?: boolean
  size?: "small"
  endText?: string
  value?: any
  variant?: "outlined" | "filled"
}
