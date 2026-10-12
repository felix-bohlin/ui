import { cx } from "../cx"
import type { FieldPrefixProps as Props } from "./types.react"

export default function FieldPrefix({ className, ...rest }: Props) {
  return <span className={cx(["ui-prefix", className])} {...rest} />
}
