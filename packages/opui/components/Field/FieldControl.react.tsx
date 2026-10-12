import { cx } from "../cx"
import type { FieldControlProps as Props } from "./types.react"

export default function FieldControl({ className, ...rest }: Props) {
  return <span className={cx(["ui-field", className])} {...rest} />
}
