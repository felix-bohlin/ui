import { omit } from "solid-js"
import type { SectionProps } from "./types.solid"

export default function TableBody(props: SectionProps) {
  const rest = omit(props, "children")

  return <tbody {...rest}>{props.children}</tbody>
}
