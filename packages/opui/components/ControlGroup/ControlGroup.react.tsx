import { defined } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ControlGroup({
  className,
  color,
  orientation,
  overflow,
  size,
  variant,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-control-group",
        { "ui-vertical": orientation === "vertical" },
        color && `ui-${color}`,
        overflow && overflow !== "shrink" && `ui-overflow-${overflow}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      role="group"
      {...defined(rest)}
    >
      {children}
    </div>
  )
}
