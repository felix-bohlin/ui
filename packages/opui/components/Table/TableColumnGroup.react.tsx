import type { TableColumnGroupProps as Props } from "./types.react"

export default function TableColumnGroup({ children, ...rest }: Props) {
  return <colgroup {...rest}>{children}</colgroup>
}
