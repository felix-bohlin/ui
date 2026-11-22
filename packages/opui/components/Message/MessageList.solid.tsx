/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { MessageListProps as Props } from "./types.solid"

export default function MessageList(props: Props) {
  const rest = omit(props, "class", "direct", "role", "children")

  return (
    <ol
      class={["ui-message-list", { "ui-direct": props.direct }, props.class]}
      role={props.role ?? "list"}
      {...rest}
    >
      {props.children}
    </ol>
  )
}
