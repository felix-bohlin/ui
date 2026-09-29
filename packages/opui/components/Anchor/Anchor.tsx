import { createUniqueId, merge, omit } from "solid-js"
import type { Props } from "./types.solid"

const insetMap: Record<string, string> = {
  "start start": "auto 100% 100% auto",
  "start end": "auto auto 100% 100%",
  "end start": "100% 100% auto auto",
  "end end": "100% auto auto 100%",
}

export default function Anchor(rawProps: Props) {
  const props = merge({ trigger: "always" }, rawProps)
  const rest = omit(
    props,
    "alignment",
    "anchored",
    "children",
    "class",
    "id",
    "trigger",
  )

  const uid = createUniqueId()
  const isHover = () => props.trigger === "hover"
  const id = () => (isHover() ? (props.id ?? uid) : undefined)

  const positionArea = () =>
    props.alignment
      ? {
          "--anchor-position-area": props.alignment,
          "--_anchor-inset": insetMap[props.alignment],
        }
      : undefined

  return (
    <span class={["ui-anchor", props.class]} style={positionArea()} {...rest}>
      {props.children}
      <span
        class="ui-anchor-floating"
        id={id()}
        popover={isHover() ? "hint" : undefined}
      >
        {props.anchored}
      </span>
    </span>
  )
}
