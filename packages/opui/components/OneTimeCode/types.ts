export type Props = {
  alphanumeric?: boolean
  endText?: string
  error?: boolean
  grouped?: boolean
  label?: string
  length?: 4 | 5 | 6 | 7 | 8
  size?: "small" | "large"
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
}
