import { cx } from "../cx"
import type { MessageListProps as Props } from "./types.react"

export default function MessageList({
  className,
  role,
  children,
  ...rest
}: Props) {
  return (
    <ol
      className={cx(["ui-message-list", className])}
      role={role ?? "list"}
      {...rest}
    >
      {children}
    </ol>
  )
}
