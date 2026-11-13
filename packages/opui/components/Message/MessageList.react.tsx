import { defined } from "../attrs"
import { cx } from "../cx"
import type { MessageListProps as Props } from "./types.react"

export default function MessageList({ className, children, ...rest }: Props) {
  return (
    <ol
      className={cx(["ui-message-list", className])}
      role="list"
      {...defined(rest)}
    >
      {children}
    </ol>
  )
}
