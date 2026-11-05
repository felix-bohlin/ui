/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { DialogHeaderProps as Props } from "./types.solid"

export default function DialogHeader(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-header", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
