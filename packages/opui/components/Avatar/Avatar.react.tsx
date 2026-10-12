import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Avatar({
  alt,
  as,
  className,
  href,
  isGroup,
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
        { "ui-avatar": !isGroup, "ui-avatar-group": isGroup },
        !isGroup && size && `ui-${size}`,
        !isGroup && variant && `ui-${variant}`,
        className,
      ])}
      href={href}
      role={isGroup ? "group" : undefined}
      type={Tag === "button" ? "button" : undefined}
      {...(rest as object)}
    >
      {src ? <img src={src} alt={alt ?? ""} /> : children}
    </Tag>
  )
}
