import { useId } from "react"
import Button from "../Button/Button.react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Message({
  author,
  className,
  datetime,
  newAuthor,
  outgoing,
  picker,
  pickerLabel = "Add reaction",
  reactions,
  reactionsLabel = "Reactions",
  time,
  typing,
  avatar,
  children,
  footer,
  ...rest
}: Props) {
  const uid = useId()
  const pickerId = `reactions-${uid}`
  const hasPicker = !!picker?.length

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
      {avatar}
      {typing ? (
        <div className="ui-bubble" role="status">
          <span className="ui-sr-only">{children}</span>
        </div>
      ) : (
        <div className="ui-bubble">
          {author && <p className="ui-header">{author}</p>}
          {children}
          {(time || footer) && (
            <p className="ui-footer">
              {time && <time dateTime={datetime}>{time}</time>}
              {footer}
            </p>
          )}
        </div>
      )}
      {!!reactions?.length && (
        <div aria-label={reactionsLabel} className="ui-reactions" role="group">
          {reactions.map(({ count, emoji, label, mine, value }) => (
            <label
              className="ui-reaction"
              data-count={count}
              key={value ?? emoji}
            >
              <input
                className="ui-sr-only"
                defaultChecked={mine}
                form={hasPicker ? pickerId : undefined}
                name="reaction"
                type="checkbox"
                value={value ?? emoji}
              />
              <span aria-hidden="true">{emoji}</span>
              <span className="ui-sr-only">{label}</span>
            </label>
          ))}
        </div>
      )}
      {hasPicker && (
        <>
          <Button
            className="ui-reaction-add"
            command="toggle-popover"
            commandfor={pickerId}
            label={pickerLabel}
            rounded
            size="x-small"
          >
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z" />
            </svg>
          </Button>
          <form
            aria-label={pickerLabel}
            className="ui-reaction-picker"
            id={pickerId}
            popover=""
          >
            {picker?.map(({ emoji, label, value }) => (
              <button
                aria-label={label}
                key={value ?? emoji}
                name="add"
                type="submit"
                value={value ?? emoji}
              >
                {emoji}
              </button>
            ))}
          </form>
        </>
      )}
    </li>
  )
}
