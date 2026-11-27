/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, omit } from "solid-js"
import { filled } from "../attrs"
import type { BreadcrumbItemProps as Props } from "./types.solid"

export default function BreadcrumbItem(props: Props) {
  const rest = omit(
    props,
    "class",
    "current",
    "href",
    "label",
    "children",
    "separator",
  )
  const resolvedSeparator = children(() => props.separator)
  const tag = () => (props.href ? "a" : "span")
  const Tag = dynamic(tag)
  const tagCurrent = () => (props.current ? "page" : undefined)

  return (
    <li class={props.class} {...rest}>
      {filled(resolvedSeparator()) && (
        <span aria-hidden="true" class="ui-separator">
          {resolvedSeparator()}
        </span>
      )}{" "}
      <Tag aria-current={tagCurrent()} href={props.href}>
        {props.label}
        {props.children}
      </Tag>
    </li>
  )
}
