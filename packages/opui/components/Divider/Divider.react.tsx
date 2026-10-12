import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Divider({
  align,
  className,
  variant,
  children,
  ...rest
}: Props) {
  return children ? (
    <div
      className={cx([
        "ui-divider",
        align && align !== "center" && `ui-align-${align}`,
        variant && `ui-${variant}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  ) : (
    <hr
      className={cx(["ui-divider", variant && `ui-${variant}`, className])}
      {...rest}
    />
  )
}
