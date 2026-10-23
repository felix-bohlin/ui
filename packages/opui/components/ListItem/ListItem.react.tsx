import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ListItem({
  as,
  borderTop,
  className,
  color,
  description,
  headline,
  href,
  htmlFor,
  inset,
  type,
  children,
  end,
  start,
  submenu,
  text,
  ...rest
}: Props) {
  const hasLabel = type === "checkbox" || type === "radio" || type === "switch"
  const Tag: ElementType | undefined = hasLabel
    ? "label"
    : (as ?? (href ? "a" : undefined))
  const tagProps = hasLabel
    ? { className: `ui-${type}`, htmlFor }
    : {
        href,
        type: Tag === "button" ? ("button" as const) : undefined,
        ...(rest as object),
      }

  const body = (
    <>
      {start && <div className="ui-start">{start}</div>}
      {headline || description || text ? (
        <div className="ui-text">
          {headline && <p>{headline}</p>}
          {description && <p>{description}</p>}
          {text}
          {children}
        </div>
      ) : (
        children
      )}
      {end && <div className="ui-end">{end}</div>}
    </>
  )

  return (
    <li
      className={cx([
        {
          "ui-border-top": borderTop,
          "ui-inset": inset,
        },
        color && `ui-${color}`,
        className,
      ])}
      {...(hasLabel || !Tag ? (rest as object) : {})}
    >
      {Tag ? <Tag {...tagProps}>{body}</Tag> : body}
      {submenu}
    </li>
  )
}
