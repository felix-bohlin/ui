export type Props = {
  autoFit?: boolean
  blacknessLabel?: string
  blueLabel?: string
  chromaLabel?: string
  colorSpaceLabel?: string
  contrastLabel?: string
  copiedLabel?: string
  copyLabel?: string
  endText?: string
  error?: boolean
  eyedropperLabel?: string
  greenLabel?: string
  hideLabel?: boolean
  hueLabel?: string
  invalidText?: string
  label?: string
  lightnessLabel?: string
  opacity?: "none" | "slider"
  opacityLabel?: string
  p3Text?: string
  pickerLabel?: string
  redLabel?: string
  saturationLabel?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  srgbText?: string
  startText?: string
  swatchOnly?: boolean
  variant?: "outlined" | "filled"
  whitenessLabel?: string
  wideText?: string
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
  startText?: string | S
}
