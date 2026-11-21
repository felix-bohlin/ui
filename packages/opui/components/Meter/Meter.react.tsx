import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Meter({
  className,
  variant,
  children,
  ...rest
}: Props) {
  return (
    <meter
      className={cx([
        "ui-meter",
        variant && variant !== "tonal" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </meter>
  )
}
