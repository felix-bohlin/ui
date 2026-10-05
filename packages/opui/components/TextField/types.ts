export type Props = {
  autoFit?: boolean
  description?: string
  endText?: string
  error?: boolean
  filled?: boolean
  label?: string
  size?: "x-small" | "small" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  description: string | S
  endText: string | S
  footer: string | S
  header: string | S
  label: string | S
  prefix: string | S
  suffix: string | S
  supportingText: string | S
}

export type InputProps =
  | "disabled"
  | "list"
  | "max"
  | "min"
  | "name"
  | "placeholder"
  | "required"
  | "step"
  | "type"
  | "value"
