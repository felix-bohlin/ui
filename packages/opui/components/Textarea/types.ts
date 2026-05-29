export type Props = {
  autoFit?: boolean
  description?: string
  error?: boolean
  filled?: boolean
  label?: string
  spread?: boolean
  small?: boolean
  endText?: string
}

export type Slots<S> = {
  description?: string | S
  footer?: string | S
  header?: string | S
  label?: string | S
  prefix?: string | S
  startText?: string | S
  suffix?: string | S
  endText?: string | S
  supportingText?: string | S
}

export type TextareaProps =
  | "cols"
  | "disabled"
  | "maxlength"
  | "minlength"
  | "name"
  | "placeholder"
  | "required"
  | "rows"
  | "value"
