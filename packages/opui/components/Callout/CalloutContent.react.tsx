import { cx } from "../cx"
import type { CalloutContentProps as Props } from "./types.react"

export default function CalloutContent({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}
