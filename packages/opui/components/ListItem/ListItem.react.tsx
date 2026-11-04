import type { ElementType } from "react"
import { cx } from "../cx"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function ListItem({
  as,
  borderTop,
  className,
  color,
  disabled,
  href,
  htmlFor,
  inset,
  type,
  children,
  description,
  end,
  label,
  start,
  submenu,
  ...rest
}: Props) {
  const hasControl =
    type === "checkbox" || type === "radio" || type === "switch"
  const tag = hasControl ? "label" : (as ?? (href ? "a" : undefined))
  const Tag = tag as ElementType
  const restOnItem = hasControl || !tag
  const hasLabel = !!label || label
  const hasDescription = !!description || description

  return (
    <li
      className={cx([
        { "ui-border-top": borderTop, "ui-inset": inset },
        color && `ui-${color}`,
        className,
      ])}
      {...(restOnItem ? (rest as object) : {})}
    >
      {tag ? (
        <Tag
          className={cx([hasControl && `ui-${type}`])}
          htmlFor={hasControl ? htmlFor : undefined}
          {...(hasControl ? {} : tagAttrs(tag, disabled, href))}
          {...(restOnItem ? {} : (rest as object))}
        >
          {start && <div className="ui-start">{start}</div>}
          {hasLabel || hasDescription ? (
            <div className="ui-text">
              {hasLabel && <p>{label}</p>}
              {hasDescription && <p>{description}</p>}
              {children}
            </div>
          ) : (
            children
          )}
          {end && <div className="ui-end">{end}</div>}
        </Tag>
      ) : (
        <>
          {start && <div className="ui-start">{start}</div>}
          {hasLabel || hasDescription ? (
            <div className="ui-text">
              {hasLabel && <p>{label}</p>}
              {hasDescription && <p>{description}</p>}
              {children}
            </div>
          ) : (
            children
          )}
          {end && <div className="ui-end">{end}</div>}
        </>
      )}
      {submenu}
    </li>
  )
}
