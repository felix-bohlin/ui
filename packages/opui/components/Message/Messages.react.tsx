import { cx } from "../cx"
import type { MessagesProps as Props } from "./types.react"

export default function Messages({ className, children, ...rest }: Props) {
  return (
    <ol className={cx(["ui-messages", className])} role="list" {...rest}>
      {children}
    </ol>
  )
}
