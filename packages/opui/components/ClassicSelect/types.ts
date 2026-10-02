export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  endText?: string
  error?: boolean
  id?: string
  items?: Item[]
  label?: string
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "filled"
}
