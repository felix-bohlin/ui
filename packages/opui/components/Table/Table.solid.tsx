/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Table(props: Props) {
  const rest = omit(
    props,
    "class",
    "density",
    "flush",
    "overflow",
    "stickyHeader",
    "children",
  )

  return (
    <table
      class={[
        "ui-table",
        { "ui-flush": props.flush, "ui-sticky-header": props.stickyHeader },
        props.density && props.density !== "normal" && `ui-${props.density}`,
        props.overflow &&
          props.overflow !== "wrap" &&
          `ui-overflow-${props.overflow}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </table>
  )
}
