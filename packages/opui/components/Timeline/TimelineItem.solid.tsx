/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, omit } from "solid-js"
import type { TimelineItemProps as Props } from "./types.solid"

export default function TimelineItem(props: Props) {
  const rest = omit(
    props,
    "class",
    "color",
    "current",
    "datetime",
    "headingLevel",
    "time",
    "children",
    "label",
    "marker",
  )
  const resolvedLabel = children(() => props.label)
  const resolvedMarker = children(() => props.marker)
  const headingLevel = () =>
    props.headingLevel === undefined ? 3 : props.headingLevel
  const heading = () => `h${headingLevel()}` as "h2" | "h3" | "h4" | "h5" | "h6"
  const Heading = dynamic(heading)

  return (
    <li
      aria-current={
        props.current === true ? "true" : props.current || undefined
      }
      class={[props.color && `ui-${props.color}`, props.class]}
      {...rest}
    >
      {resolvedMarker() && <span class="ui-marker">{resolvedMarker()}</span>}{" "}
      {props.time && <time datetime={props.datetime}>{props.time}</time>}
      {resolvedLabel() && <Heading class="ui-h6">{resolvedLabel()}</Heading>}
      {props.children}
    </li>
  )
}
