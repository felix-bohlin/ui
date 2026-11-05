/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import { tagAttrs } from "../tag"
import type { Props } from "./types.solid"

export default function Avatar(props: Props) {
  const rest = omit(
    props,
    "alt",
    "as",
    "class",
    "disabled",
    "href",
    "shape",
    "size",
    "src",
    "variant",
    "children",
  )
  const tag = () => props.as || (props.href ? "a" : "div")
  const Tag = dynamic(tag)

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
      {...(rest as object)}
    >
      {props.src ? (
        <img src={props.src} alt={props.alt ?? ""} />
      ) : (
        props.children
      )}
    </Tag>
  )
}
