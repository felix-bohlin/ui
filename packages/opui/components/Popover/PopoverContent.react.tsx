import { cx } from "../cx"
import type { PopoverContentProps as Props } from "./types.react"

export default function PopoverContent({
  className,
  children,
  ...rest
}: Props) {
  return (
    <div className={cx(["ui-content", className])} {...rest}>
      {children}
    </div>
  )
}
