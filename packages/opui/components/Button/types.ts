export type Props = {
  color?: "critical" | "primary"
  label?: string
  ripple?: boolean
  rounded?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
} & (
  | {
      as?: "a"
      href: string
      disabled?: boolean
    }
  | {
      as?: "button"
      href?: never
      disabled?: boolean
    }
)
