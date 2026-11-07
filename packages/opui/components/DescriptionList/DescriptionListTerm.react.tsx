import { cx } from "../cx"
import type { DescriptionListTermProps as Props } from "./types.react"

export default function DescriptionListTerm({
  className,
  children,
  ...rest
}: Props) {
  return (
    <dt className={cx([className])} {...rest}>
      {children}
    </dt>
  )
}
