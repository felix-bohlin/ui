export type Props = {
  autoFit?: boolean
  description?: string
  critical?: boolean
  filled?: boolean
  label?: string
  spread?: boolean
  small?: boolean
  endText?: string
}

export type Slots =
  | "description"
  | "footer"
  | "header"
  | "label"
  | "prefix"
  | "startText"
  | "suffix"
  | "endText"
  | "supportingText"

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
