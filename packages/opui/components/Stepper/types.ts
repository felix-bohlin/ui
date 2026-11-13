export type StepperItemProps = {
  complete?: boolean
  completeLabel?: string
  current?: boolean
  description?: string
  error?: boolean
  errorLabel?: string
  href?: string
  label?: string
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
