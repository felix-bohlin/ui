export type Props = {
  color?: "critical" | "primary"
  size?: "small"
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
