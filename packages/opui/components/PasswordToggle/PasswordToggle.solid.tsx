/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import "../../elements/password-toggle.js"
import { filled } from "../attrs"
import type { Props } from "./types.solid"

export default function PasswordToggle(props: Props) {
  const rest = omit(props, "for", "label", "iconChecked", "iconUnchecked")
  const resolvedIconChecked = children(() => props.iconChecked)
  const resolvedIconUnchecked = children(() => props.iconUnchecked)
  const label = () =>
    props.label === undefined ? "Show password" : props.label

  return (
    <opui-password-toggle {...rest}>
      <button
        class="ui-button ui-round"
        type="button"
        aria-label={label()}
        aria-pressed="false"
        command="--toggle-password"
        commandfor={props.for}
      >
        {filled(resolvedIconUnchecked()) ? (
          <span aria-hidden="true" class="ui-icon-unchecked">
            {resolvedIconUnchecked()}
          </span>
        ) : (
          <svg
            aria-hidden="true"
            class="ui-icon-unchecked"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          />
        )}{" "}
        {filled(resolvedIconChecked()) ? (
          <span aria-hidden="true" class="ui-icon-checked">
            {resolvedIconChecked()}
          </span>
        ) : (
          <svg
            aria-hidden="true"
            class="ui-icon-checked"
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
