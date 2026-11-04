import type { ElementType } from "react"
import { cx } from "../cx"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Avatar({
  alt,
  as,
  className,
  disabled,
  href,
  shape,
  size,
  src,
  variant,
  children,
  ...rest
}: Props) {
  const tag = as || (href ? "a" : "div")
  const Tag: ElementType = tag

  return (
    <Tag
      className={cx([
        "ui-avatar",
        shape && shape !== "circle" && `ui-${shape}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "filled" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(tag, disabled, href)}
      {...(rest as object)}
    >
      {src ? <img src={src} alt={alt ?? ""} /> : children}
    </Tag>
  )
}
