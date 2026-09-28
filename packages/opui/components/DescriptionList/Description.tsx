import { omit } from "solid-js"
import type { DescriptionProps } from "./types.solid"

export default function Description(props: DescriptionProps) {
  const rest = omit(props, "children", "class")

  return (
    <dd class={["ui-description", props.class]} {...rest}>
      {props.children}
    </dd>
  )
}
