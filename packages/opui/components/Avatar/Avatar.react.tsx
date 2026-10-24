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
  children,
  ...rest
}: Props) {
  const Tag: ElementType = as || (href ? "a" : "div")

  return (
    <Tag
      className={cx([
        "ui-avatar",
        shape && shape !== "circle" && `ui-${shape}`,
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...tagAttrs(Tag as string, disabled, href)}
      {...(rest as object)}
    >
      {src ? <img src={src} alt={alt ?? ""} /> : children}
    </Tag>
  )
}
