import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ButtonGroup({
  className,
  color,
  orientation,
  scrollable,
  shrink,
  size,
  variant,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-button-group",
        {
          "ui-scrollable": scrollable,
          "ui-shrink": shrink,
          "ui-vertical": orientation === "vertical",
        },
        color && `ui-${color}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      role="group"
      {...rest}
    />
  )
}
