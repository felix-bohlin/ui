import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({
  as,
  className,
  color,
  density,
  orientation,
  variant,
  children,
  ...rest
}: Props) {
  const Tag: ElementType = as || "div"

  return (
    <Tag
      className={cx([
        "ui-card",
        color && `ui-${color}`,
        density && density !== "normal" && `ui-${density}`,
        orientation && orientation !== "auto" && `ui-${orientation}`,
        variant && variant !== "plain" && `ui-${variant}`,
        className,
      ])}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
