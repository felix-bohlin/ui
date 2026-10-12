import { cx } from "../cx"
import type { ItemProps as Props } from "./types.react"

export default function DescriptionListItem({ className, ...rest }: Props) {
  return <div className={cx(["ui-item", className])} {...rest} />
}
