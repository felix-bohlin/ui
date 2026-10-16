import { cx } from "../cx"
import type { MessagesProps as Props } from "./types.react"

export default function Messages({
  className,
  label,
  children,
  ...rest
}: Props) {
  return (
    <ol aria-label={label} className={cx(["ui-messages", className])} {...rest}>
      {children}
    </ol>
  )
}
