import type { TableBodyProps as Props } from "./types.react"

export default function TableBody({ children, ...rest }: Props) {
  return <tbody {...rest}>{children}</tbody>
}
