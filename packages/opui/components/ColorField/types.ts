export type Props = {
  autoFit?: boolean
  chromaLabel?: string
  contrastLabel?: string
  copiedLabel?: string
  copyLabel?: string
  endText?: string
  error?: boolean
  eyedropperLabel?: string
  hideLabel?: boolean
  hueLabel?: string
  invalidText?: string
  label?: string
  lightnessLabel?: string
  opacity?: "none" | "slider"
  opacityLabel?: string
  p3Text?: string
  pickerLabel?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  srgbText?: string
  startText?: string
  variant?: "outlined" | "filled"
  wideText?: string
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
  startText?: string | S
}
