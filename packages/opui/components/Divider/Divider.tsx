import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Divider(props: Props) {
  const rest = omit(props, "class", "variant")

  return (
    <hr
      class={[
        "ui-divider",
        props.class,
        props.variant && `ui-border-${props.variant}`,
      ]}
      {...rest}
    />
  )
}
