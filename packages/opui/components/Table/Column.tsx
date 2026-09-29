import { omit } from "solid-js"
import type { ColumnProps } from "./types.solid"

export default function TableColumn(props: ColumnProps) {
  const rest = omit(props, "width")

  const colStyle = () =>
    props.width
      ? props.width.includes(":")
        ? props.width
        : `width: ${props.width}`
      : undefined

  return <col style={colStyle()} {...rest} />
}
