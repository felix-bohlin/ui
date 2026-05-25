import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function Divider(props: Props) {
  const [local, rest] = splitProps(props, ["variant", "class"])

  return (
    <hr
      class={`ui-divider ${local.variant ? `ui-border-${local.variant}` : ""} ${local.class || ""}`.trim()}
      {...rest}
    />
  )
}
