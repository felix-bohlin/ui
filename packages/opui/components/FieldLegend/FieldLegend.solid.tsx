/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function FieldLegend(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const tag = () => props.as || "legend"
  const Tag = dynamic(tag)
  const isLegend = () => tag() === "legend"

  return (
    <Tag class={[{ "ui-legend": !isLegend() }, props.class]} {...rest}>
      {props.children}
    </Tag>
  )
}
