import { createUniqueId, omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Anchor(props: Props) {
  const rest = omit(
    props,
    "alignment",
    "anchored",
    "children",
    "class",
    "id",
    "style",
    "trigger",
  )

  const uid = createUniqueId()
  const isHover = () => (props.trigger ?? "always") === "hover"
  const id = () => (isHover() ? (props.id ?? uid) : undefined)

  const style = () => {
    const positionArea = props.alignment
      ? { "--anchor-position-area": props.alignment }
      : undefined
    if (typeof props.style === "string" || !props.style) {
      const positionAreaString = positionArea
        ? `--anchor-position-area: ${props.alignment};`
        : ""
      return `${positionAreaString}${props.style ?? ""}` || undefined
    }
    return { ...positionArea, ...props.style }
  }

  return (
    <span
      class={["ui-anchor", props.class]}
      id={isHover() ? undefined : props.id}
      style={style()}
      {...rest}
    >
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
