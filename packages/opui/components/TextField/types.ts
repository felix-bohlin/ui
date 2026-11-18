export type Props = {
  autoFit?: boolean
  characterCount?: boolean
  characterCountLabel?: string
  disabled?: boolean
  dropZone?: boolean
  endText?: string
  error?: boolean
  hideLabel?: boolean
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
} & (
  | {
      passwordToggle: boolean
      passwordToggleLabel?: string
    }
  | {
      passwordToggle?: never
      passwordToggleLabel?: never
    }
)

export type Slots<S> = {
  bottom?: string | S
  end?: string | S
  endText?: string | S
  iconChecked?: S
  iconUnchecked?: S
  label?: string | S
  start?: string | S
  startText?: string | S
  top?: string | S
}
