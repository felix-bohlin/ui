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
  iconOnly: _iconOnly,
  label,
  rounded,
  size,
  variant,
  ...rest
}: Props) {
  const Tag: ElementType = as || (href ? "a" : "button")

  return (
    <Tag
      className={cx([
        "ui-button",
        { "ui-rounded": rounded },
        size && `ui-${size}`,
        variant && `ui-${variant}`,
        color && `ui-${color}`,
        className,
      ])}
      aria-label={label}
      {...tagAttrs(Tag as string, disabled, href)}
      {...(rest as object)}
    />
  )
}
