import type { HTMLAttributes } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { disabledLink, tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Chip({
  as,
  className,
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
        severity && `ui-${severity}`,
        size && size !== "medium" && `ui-${size}`,
        variant !== "tonal" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(Tag, disabled, href)}
      {...defined(rest as HTMLAttributes<HTMLElement>)}
    >
      {start}
      {label && <span className="ui-text">{label}</span>}
      {end}
    </Tag>
  )
}
