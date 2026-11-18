import { cx } from "../cx"
import type { DescriptionListDescriptionProps as Props } from "./types.react"

export default function DescriptionListDescription({
  className,
  children,
  ...rest
}: Props) {
  return (
    <dd className={cx([className])} {...rest}>
      {children}
    </dd>
  )
}
