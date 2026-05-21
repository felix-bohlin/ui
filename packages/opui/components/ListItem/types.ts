export type Props = {
  borderTop?: boolean
  class?: string
  for?: string
  inset?: boolean
  type?: "checkbox" | "radio" | "switch" | "button"
}

export type Slots<S> = {
  description?: string | S
  end?: string | S
  headline?: string | S
  start?: string | S
  text?: string | S
}
