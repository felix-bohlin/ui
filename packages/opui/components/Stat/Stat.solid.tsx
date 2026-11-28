/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import { filled } from "../attrs"
import type { Props } from "./types.solid"

export default function Stat(props: Props) {
  const rest = omit(props, "class", "size", "children", "description", "label")
  const resolvedDescription = children(() => props.description)

  return (
    <dl
      class={[
        "ui-stat",
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      <dt class="ui-label">{props.label}</dt>
      <dd class="ui-value">{props.children}</dd>
      {filled(resolvedDescription()) && (
        <dd class="ui-description">{resolvedDescription()}</dd>
      )}
    </dl>
  )
}
