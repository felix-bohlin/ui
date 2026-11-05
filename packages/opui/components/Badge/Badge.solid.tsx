/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import Anchor from "../Anchor/Anchor.solid"
import AnchorContent from "../Anchor/AnchorContent.solid"
import type { Props } from "./types.solid"

export default function Badge(props: Props) {
  const rest = omit(
    props,
    "class",
    "color",
    "corner",
    "dot",
    "hideLabel",
    "invisible",
    "label",
    "children",
    "indicator",
  )
  const resolvedIndicator = children(() => props.indicator)
  const hidden = () => props.dot || props.hideLabel

  return (
    <Anchor
      class={[
        "ui-badge",
        { "ui-dot": props.dot, "ui-invisible": props.invisible },
        props.color && `ui-${props.color}`,
        props.corner && props.corner !== "start-end" && `ui-${props.corner}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}{" "}
      <AnchorContent>
        <span class="ui-indicator">
          {hidden() && (
            <>
              {!props.dot && resolvedIndicator() && (
                <span aria-hidden="true">{resolvedIndicator()}</span>
              )}
              {props.label && <span class="ui-sr-only">{props.label}</span>}
            </>
          )}
          {hidden() ? undefined : props.label}
          {!hidden() && resolvedIndicator()}
        </span>
      </AnchorContent>
    </Anchor>
  )
}
