import { cx } from "../cx"
import type { MessagesProps as Props } from "./types.react"

export default function Messages({ className, ...rest }: Props) {
  return <ol className={cx(["ui-messages", className])} {...rest} />
}
