export type RadioProps = {
  error?: boolean
  hideLabel?: boolean
  size?: "x-small" | "small" | "large"
  spread?: boolean
  stack?: boolean
}

export type RadioInputProps = {}

export type RadioSlots<S> = {
  endText?: string | S
}
