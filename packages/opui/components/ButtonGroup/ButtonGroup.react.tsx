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
        color && `ui-${color}`,
        size && `ui-${size}`,
        variant && `ui-${variant}`,
        orientation && `ui-${orientation}`,
        { "ui-scrollable": scrollable, "ui-shrink": shrink },
        className,
      ])}
      role="group"
      {...rest}
    />
  )
}
