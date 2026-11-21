/** @jsxImportSource @solidjs/web */
import { For, omit } from "solid-js"
import "../../elements/reactions.js"
import { defined } from "../attrs"
import ToggleButton from "../ToggleButton/ToggleButton.solid"
import ToggleGroup from "../ToggleGroup/ToggleGroup.solid"
import { cx } from "../cx"
import { hydrated, hydrating } from "../solid"
import type { Props } from "./types.solid"

export default function Reactions(props: Props) {
  const rest = omit(
    props,
    "aria-label",
    "aria-labelledby",
    "class",
    "items",
    "name",
    "quick",
    "ref",
    "children",
  )
  const items = () => (props.items === undefined ? [] : props.items)
  const used = () => items().find((item) => item.value === props.quick?.value)
  const pills = () => {
    const itemsValue = items()
    return props.quick
      ? [
          used() ?? props.quick,
          ...itemsValue.filter((item) => item.value !== props.quick?.value),
        ]
      : itemsValue
  }

  return (
    <opui-reactions
      class={["ui-reactions", props.class]}
      quick-label={props.quick?.["aria-label"]}
      quick-text={props.quick?.label}
      quick-value={props.quick?.value}
      {...hydrating()}
      ref={[props.ref, hydrated]}
      {...defined(rest)}
    >
      <ToggleGroup
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        multiple
        name={props.name}
      >
        <For each={pills()} keyed={false}>
          {(item, index) => (
            <ToggleButton
              aria-label={item()["aria-label"]}
              checked={!!item().checked}
              class={cx([
                { "ui-unused": props.quick && !used() && index === 0 },
              ])}
              value={item().value}
            >
              <span aria-hidden="true">{item().label}</span>
            </ToggleButton>
          )}
        </For>
      </ToggleGroup>{" "}
      {props.children} <span class="ui-sr-only" role="status" />
    </opui-reactions>
  )
}
