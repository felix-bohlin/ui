/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function List(props: Props) {
  const rest = omit(
    props,
    "bordered",
    "class",
    "dense",
    "flush",
    "variant",
    "children",
  )

  return (
    <ul
      class={[
        "ui-list",
        {
          "ui-bordered": props.bordered,
          "ui-dense": props.dense,
          "ui-flush": props.flush,
        },
        props.variant && props.variant !== "filled" && `ui-${props.variant}`,
        props.class,
      ]}
      role="list"
      {...rest}
    >
      {props.children}
    </ul>
  )
}
