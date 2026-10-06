import { omit } from "solid-js"
import { dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function FieldLegend(props: Props) {
  const rest = omit(props, "as", "children", "class")

  const tag = () => props.as || "legend"
  const Tag = dynamic(tag)

  return (
    <Tag class={[{ "ui-legend": tag() !== "legend" }, props.class]} {...rest}>
      {props.children}
    </Tag>
  )
}
