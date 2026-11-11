import { cx } from "../cx"
import type { PopoverFooterProps as Props } from "./types.react"

export default function PopoverFooter({
  align,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-footer",
        align && align !== "end" && `ui-align-${align}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
