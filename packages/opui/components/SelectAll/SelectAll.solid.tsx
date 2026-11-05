/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/select-all.js"
import type { Props } from "./types.solid"

export default function SelectAll(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <opui-select-all class={["ui-select-all", props.class]} {...rest}>
      {props.children}
    </opui-select-all>
  )
}
