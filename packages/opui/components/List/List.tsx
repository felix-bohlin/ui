import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function List(props: Props) {
  const rest = omit(
    props,
    "bordered",
    "children",
    "class",
    "dense",
    "gutterless",
    "variant",
  )

  return (
    <ul
      class={[
        "ui-list",
        {
          "ui-bordered": props.bordered,
          "ui-dense": props.dense,
          "ui-gutterless": props.gutterless,
        },
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </ul>
  )
}
