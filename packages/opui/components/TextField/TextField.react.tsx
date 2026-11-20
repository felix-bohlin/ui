"use client"

import { type HTMLAttributes, useEffect } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function TextField({
  autoFit,
  characterCount,
  characterCountLabel,
  className,
  dropZone,
  hideLabel,
  htmlFor,
  passwordToggle,
  passwordToggleLabel = "Show password",
  size,
  spread,
  variant,
  children,
  bottom,
  end,
  endText,
  iconChecked,
  iconUnchecked,
  label,
  start,
  startText,
  top,
  ...rest
}: Props) {
  const hasLabel = Boolean(label)
  const Root = passwordToggle ? "opui-text-field" : "div"
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const startId = start ? `${htmlFor}-start` : undefined
  const endId = end ? `${htmlFor}-end` : undefined
  const topId = top ? `${htmlFor}-top` : undefined
  const bottomId = bottom ? `${htmlFor}-bottom` : undefined
  const startTextId = hasStartText ? `${htmlFor}-start-text` : undefined
  const endTextId = hasEndText ? `${htmlFor}-end-text` : undefined
  useEffect(() => {
    void import("../../elements/character-count.js")
    void import("../../elements/text-field.js")
  }, [])

  return (
    <Root
      className={cx([
        "ui-text-field",
        {
          "ui-auto-fit": autoFit,
          "ui-drop-zone": dropZone,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...(rest as HTMLAttributes<HTMLElement>)}
    >
      {hasLabel && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        {top && (
          <span className="ui-top" id={topId}>
            {top}
          </span>
        )}
        {start && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {children}
        {(end || passwordToggle) && (
          <span className="ui-end" id={endId}>
            {end}
            {passwordToggle && (
              <button
                className="ui-button ui-round"
                type="button"
                aria-label={passwordToggleLabel}
                aria-pressed="false"
                command="--toggle-password"
                commandfor={htmlFor}
              >
                {iconUnchecked ? (
                  <span aria-hidden="true" className="ui-icon-unchecked">
                    {iconUnchecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="ui-icon-unchecked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
                {iconChecked ? (
                  <span aria-hidden="true" className="ui-icon-checked">
                    {iconChecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="ui-icon-checked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
              </button>
            )}
          </span>
        )}
        {bottom && (
          <span className="ui-bottom" id={bottomId}>
            {bottom}
          </span>
        )}
      </span>
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
          {characterCount && (
            <opui-character-count
              aria-hidden="true"
              className="ui-value"
              label={characterCountLabel}
              dangerouslySetInnerHTML={{ __html: "" }}
              suppressHydrationWarning
            />
          )}
        </span>
      )}
    </Root>
  )
}
