import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Progress({
  className,
  max,
  style,
  value,
  variant,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-progress",
        variant && variant !== "tonal" && `ui-${variant}`,
        className,
      ])}
      style={style}
    >
      <progress max={max} value={value} {...rest}>
        {children}
      </progress>
    </div>
  )
}
