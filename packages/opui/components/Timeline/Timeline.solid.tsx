/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
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
      {props.items?.map(({ description, ...item }) => (
        <TimelineItem {...item}>
          {description && <p>{description}</p>}
        </TimelineItem>
      ))}{" "}
      {props.children}
    </ol>
  )
}
