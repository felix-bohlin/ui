import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({
  className,
  color,
  density,
  orientation,
  variant,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-card",
        color && `ui-${color}`,
        density && density !== "normal" && `ui-${density}`,
        orientation && orientation !== "auto" && `ui-${orientation}`,
        variant && variant !== "plain" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
