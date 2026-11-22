import type { TableFootProps as Props } from "./types.react"

export default function TableFoot({ children, ...rest }: Props) {
  return <tfoot {...rest}>{children}</tfoot>
}
