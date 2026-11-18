/** @jsxImportSource @solidjs/web */
import { For, omit } from "solid-js"
import TimelineItem from "./TimelineItem.solid"
import type { Props } from "./types.solid"

export default function Timeline(props: Props) {
  const rest = omit(props, "class", "items", "size", "tracked", "children")

  return (
    <ol
      class={[
        "ui-timeline",
        { "ui-tracked": props.tracked },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      <For each={props.items}>
        {({ description, ...item }) => (
          <TimelineItem {...item}>
            {description && <p>{description}</p>}
          </TimelineItem>
        )}
      </For>{" "}
      {props.children}
    </ol>
  )
}
