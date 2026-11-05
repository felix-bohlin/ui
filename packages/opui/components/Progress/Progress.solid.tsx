/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Progress(props: Props) {
  const rest = omit(
    props,
    "class",
    "max",
    "style",
    "value",
    "variant",
    "children",
  )

  return (
    <div
      class={[
        "ui-progress",
        props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
        props.class,
      ]}
      style={props.style}
    >
      <progress max={props.max} value={props.value} {...rest}>
        {props.children}
      </progress>
    </div>
  )
}
