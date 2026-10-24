import type { ElementType } from "react"
import { cx } from "../cx"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Chip({
  as,
  className,
  disabled,
  dot,
  href,
  label,
  multiline,
  severity,
  size,
  variant = "tonal",
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
        severity && `ui-${severity}`,
        size && size !== "medium" && `ui-${size}`,
        variant !== "tonal" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(tag, disabled, href)}
      {...(rest as object)}
    >
      {start}
      {label && <span className="ui-text">{label}</span>}
      {end}
    </Tag>
  )
}
