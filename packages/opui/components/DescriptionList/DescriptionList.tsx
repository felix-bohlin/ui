import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function DescriptionList(props: Props) {
  const rest = omit(props, "bordered", "children", "class")

  return (
    <dl
      class={[
        "ui-description-list",
        {
          "ui-bordered": !!props.bordered,
          "ui-dotted": props.bordered === "dotted",
        },
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </dl>
  )
}
