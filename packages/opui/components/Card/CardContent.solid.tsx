/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { CardContentProps as Props } from "./types.solid"

export default function CardContent(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-content", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
