/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { MessagesProps as Props } from "./types.solid"

export default function Messages(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <ol class={["ui-messages", props.class]} {...rest}>
      {props.children}
    </ol>
  )
}
