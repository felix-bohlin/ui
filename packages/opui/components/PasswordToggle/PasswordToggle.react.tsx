"use client"

import { useEffect } from "react"
import { filled } from "../attrs"
import type { Props } from "./types.react"

export default function PasswordToggle({
  htmlFor,
  label = "Show password",
  iconChecked,
  iconUnchecked,
  ...rest
}: Props) {
  useEffect(() => {
    void import("../../elements/password-toggle.js")
  }, [])

  return (
    <opui-password-toggle {...rest}>
      <button
        className="ui-button ui-round"
        type="button"
        aria-label={label}
        aria-pressed="false"
        command="--toggle-password"
        commandfor={htmlFor}
      >
        {filled(iconUnchecked) ? (
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
        )}{" "}
        {filled(iconChecked) ? (
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
    </opui-password-toggle>
  )
}
