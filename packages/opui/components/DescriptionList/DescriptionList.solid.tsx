/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function DescriptionList(props: Props) {
  const rest = omit(
    props,
    "bordered",
    "class",
    "dotted",
    "orientation",
    "children",
  )

  return (
    <dl
      class={[
        "ui-description-list",
        { "ui-bordered": props.bordered, "ui-dotted": props.dotted },
        props.orientation &&
          props.orientation !== "auto" &&
          `ui-${props.orientation}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </dl>
  )
}
