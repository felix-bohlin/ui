import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ButtonGroup({
  className,
  color,
  orientation,
  overflow,
  size,
  variant,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-button-group",
        {
          "ui-vertical": orientation === "vertical",
        },
        color && `ui-${color}`,
        overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      role="group"
      {...rest}
    />
  )
}
