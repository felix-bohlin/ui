export type Props = {
  color?: "critical" | "primary"
  rounded?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
} & (
  | {
      iconOnly: true
      label: string
    }
  | {
      iconOnly?: false
      label?: string
    }
) &
  (
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
