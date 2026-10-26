import { cx } from "../cx"
import type { DialogFooterProps as Props } from "./types.react"

export default function DialogFooter({ align, className, ...rest }: Props) {
  return (
    <div
      className={cx([
        "ui-footer",
        align && align !== "end" && `ui-align-${align}`,
        className,
      ])}
      {...rest}
    />
  )
}
