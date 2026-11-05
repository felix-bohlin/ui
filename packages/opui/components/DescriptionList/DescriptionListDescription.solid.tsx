/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { DescriptionListDescriptionProps as Props } from "./types.solid"

export default function DescriptionListDescription(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <dd class={[props.class]} {...rest}>
      {props.children}
    </dd>
  )
}
