import { merge, omit } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function FieldLegend(rawProps: Props) {
  const props = merge({ as: "legend" }, rawProps)
  const rest = omit(props, "as", "children", "class")

  return (
    <Dynamic
      component={props.as}
      class={[{ "ui-legend": props.as !== "legend" }, props.class]}
      {...rest}
    >
      {props.children}
    </Dynamic>
  )
}
