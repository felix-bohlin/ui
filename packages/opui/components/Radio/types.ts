export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  label?: string
  orientation?: "horizontal" | "vertical"
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
}

export type RadioInputProps = {}

export type Slots<S> = {
  endText?: string | S
}
