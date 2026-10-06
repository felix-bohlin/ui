import { omit } from "solid-js"
import type { ColumnProps } from "./types.solid"

export default function TableColumn(props: ColumnProps) {
  const rest = omit(props, "style", "width")

  const widthStyle = () =>
    props.width
      ? `${props.width.includes(":") ? props.width : `width: ${props.width}`};`
      : ""
  const mergedStyle = () =>
    typeof props.style === "string" || !props.style
      ? `${widthStyle()}${props.style ?? ""}` || undefined
      : props.style

  return <col style={mergedStyle()} {...rest} />
}
