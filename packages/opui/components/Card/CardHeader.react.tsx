import type { HTMLAttributes } from "react"
import { cx } from "../cx"
import type { CardHeaderProps as Props } from "./types.react"

export default function CardHeader({
  as,
  className,
  children,
  ...rest
}: Props) {
  const Tag = as || "hgroup"

  return (
    <Tag
      className={cx(["ui-header", className])}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  )
}
