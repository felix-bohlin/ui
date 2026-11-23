export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  [key: string]: any
  endText?: string
  error?: boolean
  id?: string
  items?: Item[]
  label?: string
  size?: "small"
  variant?: "outlined" | "filled"
}
