export type SharedProps = {
  color?: "critical" | "primary"
  round?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
} & (
  | {
      as?: "a"
      disabled?: boolean
      href: string
    }
  | {
      as?: "button"
      disabled?: boolean
      href?: never
    }
)

export type IconOnlyProps =
  | {
      "aria-label": string
      iconOnly: true
    }
  | {
      iconOnly?: false
    }

export type Props = SharedProps & IconOnlyProps
