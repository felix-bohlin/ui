export type Props = {
  autoFit?: boolean
  error?: boolean
  description?: string
  endText?: string
  filled?: boolean
  label?: string
  small?: boolean
  spread?: boolean
  startText?: string
}

export type Slots<S> = {
  description: string | S
  endText: string | S
  footer: string | S
  header: string | S
  label: string | S
  prefix: string | S
  startText: string | S
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
