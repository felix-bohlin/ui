export type StepperItemProps = {
  completeLabel?: string
  current?: boolean
  description?: string
  errorLabel?: string
  href?: string
  label?: string
  state?: "complete" | "error"
}

export type Props = {
  complete?: boolean
  completeLabel?: string
  current?: number
  errorLabel?: string
  items?: StepperItemProps[]
  orientation?: "auto" | "horizontal" | "vertical"
  size?: "small" | "medium"
}

export type StepperItemSlots<S> = {
  description?: string | S
  iconComplete?: S
  label?: string | S
}
