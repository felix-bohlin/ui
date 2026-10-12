import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Progress({
  children,
  className,
  max,
  value,
  variant,
  ...rest
}: Props) {
  return (
    <div className={cx(["ui-progress", variant && `ui-${variant}`, className])}>
      <progress max={max} value={value} {...rest}>
        {children}
      </progress>
    </div>
  )
}
