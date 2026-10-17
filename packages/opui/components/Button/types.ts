export type SharedProps = {
  color?: "critical" | "primary"
  round?: boolean
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

export type IconOnlyProps =
  | {
      iconOnly: true
      "aria-label": string
    }
  | {
      iconOnly?: false
    }

export type Props = SharedProps & IconOnlyProps
