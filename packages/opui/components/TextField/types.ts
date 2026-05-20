export type Props = {
  autoFit?: boolean
  critical?: boolean
  description?: string
  endText?: string
  filled?: boolean
  label?: string
  small?: boolean
  spread?: boolean
  startText?: string
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
  | "value"
