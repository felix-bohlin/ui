import type { ElementType } from "react"
import { cx } from "../cx"
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
  const isButton = Tag === "button"

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
      aria-disabled={!isButton && disabled ? "true" : undefined}
      aria-label={label}
      disabled={isButton ? disabled : undefined}
      href={href}
      type={isButton ? "button" : undefined}
      {...(rest as object)}
    />
  )
}
