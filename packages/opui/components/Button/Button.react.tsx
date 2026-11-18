import { defined } from "../attrs"
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
  const Tag = as || (href ? "a" : "button")

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
      {...tagAttrs(Tag, disabled, href)}
      {...defined(rest as object)}
    >
      {children}
    </Tag>
  )
}
