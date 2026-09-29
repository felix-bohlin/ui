import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Progress(props: Props) {
  const rest = omit(
    props,
    "aria-busy",
    "aria-describedby",
    "aria-label",
    "children",
    "class",
    "id",
    "max",
    "value",
    "variant",
  )

  return (
    <div
      class={[
        "ui-progress",
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
    >
      <progress
        aria-busy={props["aria-busy"]}
        aria-describedby={props["aria-describedby"]}
        aria-label={props["aria-label"]}
        id={props.id}
        max={props.max}
        value={props.value}
        {...rest}
      >
        {props.children}
      </progress>
    </div>
  )
}
