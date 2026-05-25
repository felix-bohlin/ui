/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import Anchor from "../Anchor/Anchor"
import type { Props } from "./types.solid"

export default function Tooltip(props: Props) {
  const [local, rest] = splitProps(props, [
    "alignment",
    "arrow",
    "id",
    "label",
    "content",
    "class",
    "children",
  ])

  return (
    <Anchor
      alignment={local.alignment}
      class={`ui-tooltip ${local.arrow ? "ui-with-arrow" : ""} ${local.class || ""}`.trim()}
      id={local.id}
      trigger="hover"
      anchored={
        <>
          {local.label}
          {local.content}
        </>
      }
      {...rest}
    >
      {local.children}
    </Anchor>
  )
}
