/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { cx } from "../cx"
import type { DescriptionListItemProps as Props } from "./types.solid"

export default function DescriptionListItem(props: Props) {
  const rest = omit(props, "class", "total", "children")

  return (
    <div class={cx([props.total && "ui-total", props.class])} {...rest}>
      {props.children}
    </div>
  )
}
