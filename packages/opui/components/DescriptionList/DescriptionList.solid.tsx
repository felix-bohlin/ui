/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function DescriptionList(props: Props) {
  const rest = omit(props, "border", "class", "orientation", "children")

  return (
    <dl
      class={[
        "ui-description-list",
        props.border && `ui-border-${props.border}`,
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
