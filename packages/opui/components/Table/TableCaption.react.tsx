import type { TableCaptionProps as Props } from "./types.react"

export default function TableCaption({ children, ...rest }: Props) {
  return <caption {...rest}>{children}</caption>
}
