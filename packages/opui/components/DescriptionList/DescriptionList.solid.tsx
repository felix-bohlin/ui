/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function DescriptionList(props: Props) {
  const rest = omit(props, "class", "leader", "orientation", "children")

  return (
    <dl
      class={[
        "ui-description-list",
        props.leader && `ui-leader-${props.leader}`,
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
