import { omit } from "solid-js"
import type { TermProps } from "./types.solid"

export default function Term(props: TermProps) {
  const rest = omit(props, "children", "class")

  return (
    <dt class={["ui-term", props.class]} {...rest}>
      {props.children}
    </dt>
  )
}
