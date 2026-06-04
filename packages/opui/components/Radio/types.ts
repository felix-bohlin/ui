export type RadioProps = {
  disabled?: boolean
  error?: boolean
  hideLabel?: boolean
  size?: "small" | "large"
  stack?: boolean
}

export type RadioInputProps = {}

export type RadioSlots<S> = {
  endText?: string | S
}
