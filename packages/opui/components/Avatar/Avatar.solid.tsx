/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { warnUnnamedControl } from "../dev"
import { tagAttrs } from "../tag"
import type { Props } from "./types.solid"

export default function Avatar(props: Props) {
  const rest = omit(
    props,
    "as",
    "class",
    "disabled",
    "href",
    "label",
    "shape",
    "size",
    "src",
    "variant",
    "children",
  )
  const tag = () => props.as || (props.href ? "a" : "div")
  const Tag = dynamic(tag)
  untrack(() => {
    warnUnnamedControl("Avatar", props.as === "button" || props.href, props)
  })

  return (
    <Tag
      class={[
        "ui-avatar",
        props.shape && props.shape !== "circle" && `ui-${props.shape}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.variant && props.variant !== "filled" && `ui-${props.variant}`,
        props.class,
      ]}
      {...tagAttrs(tag(), props.disabled, props.href)}
      {...defined(rest as object)}
    >
      {props.src ? (
        <img src={props.src} alt={props.label ?? ""} />
      ) : (
        <span aria-hidden="true">{props.children}</span>
      )}
      {!props.src && props.label && (
        <span class="ui-sr-only">{props.label}</span>
      )}
    </Tag>
  )
}
