import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Message({
  author,
  className,
  datetime,
  newAuthor,
  outgoing,
  time,
  typing,
  children,
  actions,
  bottom,
  end,
  start,
  ...rest
}: Props) {
  return (
    <li
      className={cx([
        "ui-message",
        {
          "ui-new-author": newAuthor,
          "ui-outgoing": outgoing,
          "ui-typing": typing,
        },
        className,
      ])}
      {...rest}
    >
      {start}
      {typing ? (
        <div className="ui-content" role="status">
          <span className="ui-sr-only">{children}</span>
        </div>
      ) : (
        <div className="ui-content">
          {author && <p className="ui-header">{author}</p>}
          {children}
          {(time || end) && (
            <p className="ui-footer">
              {time && <time dateTime={datetime}>{time}</time>}
              {end && <span className="ui-end">{end}</span>}
            </p>
          )}
        </div>
      )}
      {actions && <div className="ui-actions">{actions}</div>}
      {bottom && <div className="ui-bottom">{bottom}</div>}
    </li>
  )
}
