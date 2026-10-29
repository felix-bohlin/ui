import { cx } from "../cx"
import type { Props } from "./types.react"

export default function FieldDescription({ className, ...rest }: Props) {
  return <p className={cx(["ui-description", className])} {...rest} />
}
