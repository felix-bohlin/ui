import { defined } from "../attrs"
import { cx } from "../cx"
import { warnUnnamedControl } from "../dev"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Avatar({
  as,
  className,
  disabled,
  href,
  label,
  shape,
  size,
  src,
  variant,
  children,
  ...rest
}: Props) {
  const Tag = as || (href ? "a" : "div")
  warnUnnamedControl("Avatar", as === "button" || href, { ...rest, label })

  return (
    <Tag
      className={cx([
        "ui-avatar",
        shape && shape !== "circle" && `ui-${shape}`,
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "filled" && `ui-${variant}`,
        className,
      ])}
      {...tagAttrs(Tag, disabled, href)}
      {...defined(rest as object)}
    >
      {src ? (
        <img src={src} alt={label ?? ""} />
      ) : (
        <span aria-hidden="true">{children}</span>
      )}
      {!src && label && <span className="ui-sr-only">{label}</span>}
    </Tag>
  )
}
