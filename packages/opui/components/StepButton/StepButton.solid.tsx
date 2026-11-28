/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import "../../elements/step-button.js"
import type { Props } from "./types.solid"

export default function StepButton(props: Props) {
  const rest = omit(props, "command", "for", "label", "children")
  const resolvedChildren = children(() => props.children)
  const name = () =>
    props.label ?? (props.command === "--step-down" ? "Decrease" : "Increase")

  return (
    <opui-step-button {...rest}>
      <button
        class="ui-button ui-round"
        type="button"
        aria-controls={props.for}
        aria-label={name()}
        command={props.command}
        commandfor={props.for}
      >
        {resolvedChildren() === undefined ? (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          />
        ) : (
          resolvedChildren()
        )}
      </button>
    </opui-step-button>
  )
}
