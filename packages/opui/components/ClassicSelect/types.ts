export type ClassicSelectItem = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  endText?: string
  error?: boolean
  id?: string
  items?: ClassicSelectItem[]
  label?: string
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "filled"
}
