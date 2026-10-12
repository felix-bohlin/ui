import { cx } from "../cx"
import type { FieldHeaderProps as Props } from "./types.react"

export default function FieldHeader({ className, ...rest }: Props) {
  return <span className={cx(["ui-header", className])} {...rest} />
}
