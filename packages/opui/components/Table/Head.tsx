import { omit } from "solid-js"
import type { SectionProps } from "./types.solid"

export default function TableHead(props: SectionProps) {
  const rest = omit(props, "children")

  return <thead {...rest}>{props.children}</thead>
}
