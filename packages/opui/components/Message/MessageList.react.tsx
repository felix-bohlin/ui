import { cx } from "../cx"
import type { MessageListProps as Props } from "./types.react"

export default function MessageList({
  className,
  direct,
  role,
  children,
  ...rest
}: Props) {
  return (
    <ol
      className={cx(["ui-message-list", { "ui-direct": direct }, className])}
      role={role ?? "list"}
      {...rest}
    >
      {children}
    </ol>
  )
}
