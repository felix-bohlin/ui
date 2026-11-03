import { cx } from "../cx"
import type { DescriptionListItemProps as Props } from "./types.react"

export default function DescriptionListItem({
  className,
  children,
  ...rest
}: Props) {
  return (
    <div className={cx([className])} {...rest}>
      {children}
    </div>
  )
}
