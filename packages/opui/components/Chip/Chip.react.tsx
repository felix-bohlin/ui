import type { HTMLAttributes } from "react"
import { defined, filled } from "../attrs"
import { cx } from "../cx"
import { disabledLink, tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Chip({
  as,
  className,
  color,
  disabled,
  dot,
  href,
  multiline,
  severity,
  size,
  variant = "tonal",
  end,
  label,
  start,
  ...rest
}: Props) {
  const Tag = disabledLink(as, disabled) ? "a" : as || (href ? "a" : "div")

  return (
    <Tag
      className={cx([
        "ui-chip",
        { "ui-dot": dot, "ui-multiline": multiline },
        color && `ui-${color}`,
        severity && `ui-${severity}`,
        size && size !== "medium" && `ui-${size}`,
        variant !== "tonal" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(Tag, disabled, href)}
      {...defined(rest as HTMLAttributes<HTMLElement>)}
    >
      {start}
      {filled(label) && <span className="ui-text">{label}</span>}
      {end}
    </Tag>
  )
}
