/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { DialogFooterProps as Props } from "./types.solid"

export default function DialogFooter(props: Props) {
  const rest = omit(props, "align", "class", "children")

  return (
    <div
      class={[
        "ui-footer",
        props.align && props.align !== "end" && `ui-align-${props.align}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </div>
  )
}
