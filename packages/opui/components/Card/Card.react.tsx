import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({ className, variant, children, ...rest }: Props) {
  return (
    <div
      className={cx([
        "ui-card",
        variant && variant !== "plain" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
