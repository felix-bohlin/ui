import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Table(props: Props) {
  const rest = omit(props, "children", "class", "variant")

  return (
    <table
      class={["ui-table", props.variant && `ui-${props.variant}`, props.class]}
      {...rest}
    >
      {props.children}
    </table>
  )
}
