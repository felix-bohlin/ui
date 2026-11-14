import type { TableHeadProps as Props } from "./types.react"

export default function TableHead({ children, ...rest }: Props) {
  return <thead {...rest}>{children}</thead>
}
