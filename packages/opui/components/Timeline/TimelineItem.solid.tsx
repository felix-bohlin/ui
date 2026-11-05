/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
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
  const headingLevel = () => props.headingLevel ?? 3
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
      {props.marker && <span class="ui-marker">{props.marker}</span>}{" "}
      {props.time && <time datetime={props.datetime}>{props.time}</time>}
      {props.label && <Heading class="ui-h6">{props.label}</Heading>}
      {props.children}
    </li>
  )
}
