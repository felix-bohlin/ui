import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Table(props: Props) {
  const rest = omit(props, "children", "class", "stickyHeader", "variant")

  return (
    <table
      class={[
        "ui-table",
        { "ui-sticky-header": props.stickyHeader },
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </table>
  )
}
