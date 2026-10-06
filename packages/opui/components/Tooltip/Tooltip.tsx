import { omit } from "solid-js"
import Anchor from "../Anchor/Anchor"
import type { Props } from "./types.solid"

export default function Tooltip(props: Props) {
  const rest = omit(
    props,
    "alignment",
    "arrow",
    "children",
    "class",
    "content",
    "id",
    "label",
  )

  return (
    <Anchor
      alignment={props.alignment}
      anchored={
        <>
          {props.label}
          {props.content}
        </>
      }
      class={["ui-tooltip", { "ui-with-arrow": props.arrow }, props.class]}
      id={props.id}
      trigger="hover"
      {...rest}
    >
      {props.children}
    </Anchor>
  )
}
