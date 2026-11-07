import { cx } from "../cx"
import type { AccordionActionsProps as Props } from "./types.react"

export default function AccordionActions({
  align,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-actions",
        align && align !== "end" && `ui-align-${align}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
