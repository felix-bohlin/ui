/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Stat(props: Props) {
  const rest = omit(props, "class", "size", "children", "description", "label")

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
      {props.description && <dd class="ui-description">{props.description}</dd>}
    </dl>
  )
}
