import { filled } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Divider({
  align,
  className,
  color,
  variant,
  children,
  ...rest
}: Props) {
  return filled(children) ? (
    <div
      className={cx([
        "ui-divider",
        align && align !== "center" && `ui-align-${align}`,
        color && `ui-${color}`,
        variant && variant !== "outlined" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  ) : (
    <hr
      className={cx([
        "ui-divider",
        color && `ui-${color}`,
        variant && variant !== "outlined" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
