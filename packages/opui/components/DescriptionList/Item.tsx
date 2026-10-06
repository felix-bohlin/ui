import { omit } from "solid-js"
import type { ItemProps } from "./types.solid"

export default function Item(props: ItemProps) {
  const rest = omit(props, "children", "class")

  return (
    <div class={["ui-item", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
