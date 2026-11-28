import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Progress({
  className,
  max,
  round,
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
        { "ui-round": round },
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
