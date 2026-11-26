/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function FieldGroup(props: Props) {
  const rest = omit(props, "class", "orientation", "children")

  return (
    <div
      class={[
        "ui-field-group",
        props.orientation &&
          props.orientation !== "auto" &&
          `ui-${props.orientation}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </div>
  )
}
