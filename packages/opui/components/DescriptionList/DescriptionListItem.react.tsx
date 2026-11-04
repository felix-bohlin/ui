import { cx } from "../cx"
import type { DescriptionListItemProps as Props } from "./types.react"

export default function DescriptionListItem({
  className,
  total,
  children,
  ...rest
}: Props) {
  return (
    <div className={cx([total && "ui-total", className])} {...rest}>
      {children}
    </div>
  )
}
