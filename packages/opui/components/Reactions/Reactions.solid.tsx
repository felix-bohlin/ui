/** @jsxImportSource @solidjs/web */
import { For, omit } from "solid-js"
import "../../elements/reactions.js"
import { defined } from "../attrs"
import ToggleButton from "../ToggleButton/ToggleButton.solid"
import ToggleGroup from "../ToggleGroup/ToggleGroup.solid"
import { pillsOf, usedItem } from "./pills"
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
  const used = () => usedItem(items(), props.quick)
  const pills = () => pillsOf(items(), props.quick, used())

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
                { "ui-suggested": props.quick && !used() && index === 0 },
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
