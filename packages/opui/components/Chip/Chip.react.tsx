import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Chip({
  as,
  className,
  color,
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
  const Tag: ElementType = as || (href ? "a" : "div")

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
      href={Tag === "a" ? href : undefined}
      type={Tag === "button" ? "button" : undefined}
      {...(rest as object)}
    >
      {start}
      {children}
      {label && <span className="ui-text">{label}</span>}
      {end}
    </Tag>
  )
}
