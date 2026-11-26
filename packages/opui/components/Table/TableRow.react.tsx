import type { TableRowProps as Props } from "./types.react"

export default function TableRow({ children, ...rest }: Props) {
  return <tr {...rest}>{children}</tr>
}
