import { omit, Show } from "solid-js"
import Anchor from "../Anchor/Anchor"
import type { Props } from "./types.solid"

export default function Badge(props: Props) {
  const rest = omit(
    props,
    "alignment",
    "children",
    "class",
    "color",
    "dot",
    "indicator",
    "invisible",
    "label",
    "srLabel",
  )

  return (
    <Anchor
      class={[
        "ui-badge",
        {
          "ui-dot": props.dot,
          "ui-invisible": props.invisible,
        },
        props.alignment && `ui-${props.alignment}`,
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      anchored={
        <span class="ui-badge-indicator">
          {props.dot ? "" : props.label}
          <Show when={!props.dot}>{props.indicator}</Show>
          <Show when={props.srLabel}>
            <span class="ui-sr-only">{props.srLabel}</span>
          </Show>
        </span>
      }
      {...rest}
    >
      {props.children}
    </Anchor>
  )
}
