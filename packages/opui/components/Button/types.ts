export type CommonProps = {
  [key: string]: any
  as?: string
  class?: string
  color?: "critical" | "primary"
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal" | "filled"
}
export type AnchorProps = CommonProps & {
  disabled?: never
  href: string
}
export type ButtonProps = CommonProps & {
  disabled?: boolean
  href?: undefined
}
export type Props = AnchorProps | ButtonProps
