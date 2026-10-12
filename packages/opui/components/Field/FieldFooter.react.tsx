import { cx } from "../cx"
import type { FieldFooterProps as Props } from "./types.react"

export default function FieldFooter({ className, ...rest }: Props) {
  return <span className={cx(["ui-footer", className])} {...rest} />
}
