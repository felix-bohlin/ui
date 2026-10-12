import { cx } from "../cx"
import type { FieldStartTextProps as Props } from "./types.react"

export default function FieldStartText({ className, ...rest }: Props) {
  return <span className={cx(["ui-start-text", className])} {...rest} />
}
