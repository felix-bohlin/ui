import type { ComponentProps, HTMLAttributes } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { disabledLink, tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function ListItem({
  as,
  borderTop,
  choice,
  className,
  color,
  disabled,
  href,
  htmlFor,
  inset,
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
    choice === "checkbox" || choice === "radio" || choice === "switch"
  const Tag = hasControl
    ? "label"
    : disabledLink(as, disabled)
      ? "a"
      : (as ?? (href ? "a" : undefined))
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
      {...(restOnItem ? (rest as ComponentProps<"li">) : {})}
    >
      {Tag ? (
        <Tag
          className={cx([hasControl && `ui-${choice}`])}
          htmlFor={hasControl ? htmlFor : undefined}
          {...(hasControl ? {} : tagAttrs(Tag, disabled, href))}
          {...defined(restOnItem ? {} : (rest as HTMLAttributes<HTMLElement>))}
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
