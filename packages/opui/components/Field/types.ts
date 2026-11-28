export type Props = {
  autoFit?: boolean
  dense?: boolean
  dropZone?: boolean
  endText?: string
  for: string
  hideLabel?: boolean
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  bottom?: string | S
  end?: string | S
  endText?: string | S
  label?: string | S
  start?: string | S
  startText?: string | S
  top?: string | S
}
