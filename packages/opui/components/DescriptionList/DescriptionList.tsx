import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function DescriptionList(props: Props) {
  const [local, rest] = splitProps(props, ["bordered", "class", "children"])

  return (
    <dl
      class={`ui-description-list ${local.bordered ? "ui-bordered" : ""} ${local.bordered === "dotted" ? "ui-dotted" : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      {local.children}
    </dl>
  )
}
