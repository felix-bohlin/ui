import type { ElementType } from "react"
import { cx } from "../cx"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Button({
  as,
  className,
  color,
  disabled,
  href,
  round,
  size,
  variant,
  children,
  ...rest
}: Props) {
  const tag = as || (href ? "a" : "button")
  const Tag: ElementType = tag

  return (
    <Tag
      className={cx([
        "ui-button",
        { "ui-round": round },
        color && `ui-${color}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(tag, disabled, href)}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
