/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { CalloutContentProps as Props } from "./types.solid"

export default function CalloutContent(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-content", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
