/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { mergeStyle } from "../style"
import type { TableColumnProps as Props } from "./types.solid"

export default function TableColumn(props: Props) {
  const rest = omit(props, "style", "width")

  return (
    <col style={mergeStyle({ width: props.width }, props.style)} {...rest} />
  )
}
