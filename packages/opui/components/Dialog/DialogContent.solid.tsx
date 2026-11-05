/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { DialogContentProps as Props } from "./types.solid"

export default function DialogContent(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-content", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
