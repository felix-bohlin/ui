/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { DescriptionListTermProps as Props } from "./types.solid"

export default function DescriptionListTerm(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <dt class={[props.class]} {...rest}>
      {props.children}
    </dt>
  )
}
