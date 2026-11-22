import { mergeStyle } from "../style"
import type { TableColumnProps as Props } from "./types.react"

export default function TableColumn({ style, width, ...rest }: Props) {
  return <col style={mergeStyle({ width }, style ?? {})} {...rest} />
}
