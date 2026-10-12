import { cx } from "../cx"
import type { FieldSuffixProps as Props } from "./types.react"

export default function FieldSuffix({ className, ...rest }: Props) {
  return <span className={cx(["ui-suffix", className])} {...rest} />
}
