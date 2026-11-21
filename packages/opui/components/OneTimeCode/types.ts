export type Props = {
  endText?: string
  for: string
  grouped?: boolean
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
}
