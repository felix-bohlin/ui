import type { ColumnProps as Props } from "./types.react"

export default function TableColumn({ style, width, ...rest }: Props) {
  return (
    <col style={width || style ? { width, ...style } : undefined} {...rest} />
  )
}
