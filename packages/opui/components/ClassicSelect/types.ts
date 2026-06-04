export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  [key: string]: any
  error?: boolean
  id?: string
  items?: Item[]
  label?: string
  size?: "small"
  endText?: string
  variant?: "outlined" | "filled"
}
