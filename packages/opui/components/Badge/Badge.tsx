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
  )

  const positionArea = () =>
    props.alignment === "start-start"
      ? "start start"
      : props.alignment === "end-start"
        ? "end start"
        : props.alignment === "end-end"
          ? "end end"
          : undefined

  return (
    <Anchor
      alignment={positionArea()}
      anchored={
        <span class="ui-badge-indicator" aria-label={props.label?.toString()}>
          {props.dot ? "" : props.label}
          <Show when={!props.dot}>{props.indicator}</Show>
        </span>
      }
      class={[
        "ui-badge",
        {
          "ui-dot": !!props.dot,
          "ui-invisible": !!props.invisible,
        },
        props.alignment && `ui-${props.alignment}`,
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </Anchor>
  )
}
