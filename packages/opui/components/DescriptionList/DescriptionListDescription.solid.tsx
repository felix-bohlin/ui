/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { cx } from "../cx"
import type { DescriptionListDescriptionProps as Props } from "./types.solid"

export default function DescriptionListDescription(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <dd class={cx([props.class])} {...rest}>
      {props.children}
    </dd>
  )
}
