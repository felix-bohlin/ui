/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { CardHeaderProps as Props } from "./types.solid"

export default function CardHeader(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const tag = () => props.as || "hgroup"
  const Tag = dynamic(tag)

  return (
    <Tag class={["ui-header", props.class]} {...(rest as object)}>
      {props.children}
    </Tag>
  )
}
