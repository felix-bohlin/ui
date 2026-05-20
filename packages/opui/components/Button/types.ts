export type Props = {
  color?: "critical" | "primary"
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
} & (
  | {
      as: "a"
      href: string
      disabled?: never
    }
  | {
      as?: "button"
      href?: never
      disabled?: boolean
    }
)
