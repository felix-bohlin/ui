/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableCaptionProps as Props } from "./types.solid"

export default function TableCaption(props: Props) {
  const rest = omit(props, "children")

  return <caption {...rest}>{props.children}</caption>
}
