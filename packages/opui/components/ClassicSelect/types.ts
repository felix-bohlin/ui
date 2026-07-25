export type Item = {
  text: string
  value: any
}

export type ClassicSelectProps = {
  error?: boolean
  id?: string
  items?: Item[]
  label?: string
  size?: "small"
  endText?: string
  variant?: "outlined" | "filled"
}
