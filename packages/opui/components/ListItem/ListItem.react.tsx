import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function ListItem({
  as,
  borderTop,
  className,
  description,
  for: htmlFor,
  headline,
  href,
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
  const Tag: ElementType | undefined = as ?? (href ? "a" : undefined)

  const startPart = start && <div className="ui-start">{start}</div>
  const endPart = end && <div className="ui-end">{end}</div>

  const body = (
    <>
      {startPart}
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
      {endPart}
    </>
  )

  return (
    <li
      className={cx([
        {
          "ui-border-top": borderTop,
          "ui-inset": inset,
        },
        className,
      ])}
      {...(Tag ? {} : (rest as object))}
    >
      {hasLabel ? (
        <label className={`ui-${type}`} htmlFor={htmlFor}>
          {startPart}
          {(text || headline || description) && (
            <div className="ui-text">
              {headline && <p>{headline}</p>}
              {description && <p>{description}</p>}
              {text}
            </div>
          )}
          {endPart}
          {children}
        </label>
      ) : Tag ? (
        <Tag
          href={href}
          type={Tag === "button" ? "button" : undefined}
          {...(rest as object)}
        >
          {body}
        </Tag>
      ) : (
        body
      )}
      {submenu}
    </li>
  )
}
