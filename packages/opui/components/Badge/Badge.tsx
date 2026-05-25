import { splitProps, type JSX } from "solid-js"
import Anchor from "../Anchor/Anchor"
import type { Props } from "./types.solid"

export default function Badge(props: Props) {
  const [local, rest] = splitProps(props, [
    "alignment",
    "color",
    "dot",
    "invisible",
    "label",
    "class",
    "children",
  ])

  const positionArea = () =>
    local.alignment === "start-start"
      ? "start start"
      : local.alignment === "end-start"
        ? "end start"
        : local.alignment === "end-end"
          ? "end end"
          : undefined

  return (
    <Anchor
      alignment={positionArea()}
      class={`ui-badge ${local.dot ? "ui-dot" : ""} ${local.invisible ? "ui-invisible" : ""} ${local.alignment ? `ui-${local.alignment}` : ""} ${local.color ? `ui-${local.color}` : ""} ${local.class || ""}`.trim()}
      anchored={
        <span class="ui-badge-indicator" aria-label={local.label?.toString()}>
          {local.dot ? "" : local.label}
        </span>
      }
      {...rest}
    >
      {local.children}
    </Anchor>
  )
}
