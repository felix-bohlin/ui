export type Props = {
  clearLabel?: string
  disabled?: boolean
  error?: boolean
  label: string
  max?: number | string
  name?: string
  required?: boolean
  size?: "small" | "medium" | "large"
  starLabel?: {
    few?: string
    many?: string
    one?: string
    other: string
    two?: string
    zero?: string
  }
  value?: number | string
}
