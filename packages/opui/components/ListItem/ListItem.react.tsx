import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ListItem({
  as,
  borderTop,
  className,
  color,
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
  const Tag: ElementType | undefined = hasControl
    ? "label"
    : (as ?? (href ? "a" : undefined))
  const tagProps = hasControl
    ? { className: `ui-${type}`, htmlFor }
    : {
        href,
        type: Tag === "button" ? ("button" as const) : undefined,
        ...(rest as object),
      }

  const body = (
    <>
      {start && <div className="ui-start">{start}</div>}
      {label || description ? (
        <div className="ui-text">
          {label && <p>{label}</p>}
          {description && <p>{description}</p>}
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
      {...(hasControl || !Tag ? (rest as object) : {})}
    >
      {Tag ? <Tag {...tagProps}>{body}</Tag> : body}
      {submenu}
    </li>
  )
}
