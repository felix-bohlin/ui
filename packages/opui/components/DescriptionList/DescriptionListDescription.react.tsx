import { cx } from "../cx"
import type { DescriptionProps as Props } from "./types.react"

export default function DescriptionListDescription({
  className,
  ...rest
}: Props) {
  return <dd className={cx([className])} {...rest} />
}
