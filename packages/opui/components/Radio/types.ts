export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  stack?: boolean
}

export type RadioInputProps = {}

export type Slots<S> = {
  endText?: string | S
}
