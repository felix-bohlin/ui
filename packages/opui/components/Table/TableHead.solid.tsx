/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableHeadProps as Props } from "./types.solid"

export default function TableHead(props: Props) {
  const rest = omit(props, "children")

  return <thead {...rest}>{props.children}</thead>
}
