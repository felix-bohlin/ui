import { cx } from "../cx"
import type { DrawerFooterProps as Props } from "./types.react"

export default function DrawerFooter({
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
