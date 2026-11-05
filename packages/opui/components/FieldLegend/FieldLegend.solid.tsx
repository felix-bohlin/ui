/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit, untrack } from "solid-js"
import { useFieldsetContext } from "../Fieldset/context.solid"
import { warnReplacedId } from "../dev"
import { cx } from "../cx"
import type { Props } from "./types.solid"

export default function FieldLegend(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const fieldset = useFieldsetContext()
  const tag = () => props.as || "legend"
  const Tag = dynamic(tag)
  const isLegend = () => tag() === "legend"
  untrack(() => {
    warnReplacedId("FieldLegend", "Fieldset", rest.id, fieldset?.legendId)
  })

  return (
    <Tag
      class={cx([{ "ui-legend": !isLegend() }, props.class])}
      {...(rest as object)}
      id={fieldset?.legendId ?? rest.id}
    >
      {props.children}
    </Tag>
  )
}
