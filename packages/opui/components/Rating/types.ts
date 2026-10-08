export type Props = {
  clearLabel?: string
  disabled?: boolean
  error?: boolean
  label?: string
  max?: number | string
  name?: string
  required?: boolean
  size?: "small" | "large"
  starLabel?: (value: number) => string
  value?: number | string
}
