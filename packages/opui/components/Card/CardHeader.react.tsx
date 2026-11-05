import type { ElementType } from "react"
import { cx } from "../cx"
import type { CardHeaderProps as Props } from "./types.react"

export default function CardHeader({
  as,
  className,
  children,
  ...rest
}: Props) {
  const Tag: ElementType = as || "hgroup"

  return (
    <Tag className={cx(["ui-header", className])} {...(rest as object)}>
      {children}
    </Tag>
  )
}
