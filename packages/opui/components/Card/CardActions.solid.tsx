/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { CardActionsProps as Props } from "./types.solid"

export default function CardActions(props: Props) {
  const rest = omit(props, "align", "class", "children")

  return (
    <div
      class={[
        "ui-actions",
        props.align && props.align !== "end" && `ui-align-${props.align}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </div>
  )
}
