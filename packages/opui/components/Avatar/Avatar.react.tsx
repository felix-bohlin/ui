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
  size,
  src,
  variant,
  children,
  ...rest
}: Props) {
  const Tag: ElementType = as || (href ? "a" : "div")

  return (
    <Tag
      className={cx([
        "ui-avatar",
        size && size !== "medium" && `ui-${size}`,
        variant && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(Tag as string, disabled, href)}
      {...(rest as object)}
    >
      {src ? <img src={src} alt={alt ?? ""} /> : children}
    </Tag>
  )
}
