import { cx } from "../cx"
import type { CardHeaderProps as Props } from "./types.react"

export default function CardHeader({ className, children, ...rest }: Props) {
  return (
    <hgroup className={cx(["ui-header", className])} {...rest}>
      {children}
    </hgroup>
  )
}
