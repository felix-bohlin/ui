/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { CardHeaderProps as Props } from "./types.solid"

export default function CardHeader(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <hgroup class={["ui-header", props.class]} {...rest}>
      {props.children}
    </hgroup>
  )
}
