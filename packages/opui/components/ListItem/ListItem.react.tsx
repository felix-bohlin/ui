import { defined } from "../attrs"
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
  iconChecked,
  label,
  start,
  submenu,
  ...rest
}: Props) {
  const hasControl =
    type === "checkbox" || type === "radio" || type === "switch"
  const Tag = hasControl ? "label" : (as ?? (href ? "a" : undefined))
  const restOnItem = hasControl || !Tag
  const hasLabel = !!label
  const hasDescription = !!description

  return (
    <li
      className={cx([
        { "ui-border-top": borderTop, "ui-inset": inset },
        color && `ui-${color}`,
        className,
      ])}
      {...(restOnItem ? (rest as object) : {})}
    >
      {Tag ? (
        <Tag
          className={cx([hasControl && `ui-${type}`])}
          htmlFor={hasControl ? htmlFor : undefined}
          {...(hasControl ? {} : tagAttrs(Tag, disabled, href))}
          {...defined(restOnItem ? {} : (rest as object))}
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
          {iconChecked && (
            <span aria-hidden="true" className="ui-icon-checked">
              {iconChecked}
            </span>
          )}
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
          {iconChecked && (
            <span aria-hidden="true" className="ui-icon-checked">
              {iconChecked}
            </span>
          )}
        </>
      )}
      {submenu}
    </li>
  )
}
