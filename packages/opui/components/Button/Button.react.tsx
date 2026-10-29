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
  ...rest
}: Props) {
  const Tag: ElementType = as || (href ? "a" : "button")

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
      {...tagAttrs(Tag as string, disabled, href)}
      {...(rest as object)}
    />
  )
}
