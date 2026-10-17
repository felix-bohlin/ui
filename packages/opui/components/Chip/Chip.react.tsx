import type { ElementType } from "react"
import { cx } from "../cx"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Chip({
  as,
  className,
  color,
  disabled,
  dot,
  href,
  label,
  multiline,
  size,
  variant = "tonal",
  children,
  end,
  start,
  ...rest
}: Props) {
  const tag = as || (href ? "a" : "div")
  const Tag: ElementType = tag

  return (
    <Tag
      className={cx([
        "ui-chip",
        {
          "ui-dot": dot,
          "ui-multiline": multiline,
        },
        color && `ui-${color}`,
        size && `ui-${size}`,
        variant && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(tag, disabled, href)}
      {...(rest as object)}
    >
      {start}
      {children}
      {label && <span className="ui-text">{label}</span>}
      {end}
    </Tag>
  )
}
