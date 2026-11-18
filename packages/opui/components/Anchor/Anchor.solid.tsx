/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { AnchorContext } from "./context.solid"
import { warnMissingId } from "../dev"
import { mergeStyle } from "../style"
import { extendsAnchor } from "./root"
import { cx } from "../cx"
import type { Props } from "./types.solid"

export default function Anchor(props: Props) {
  const rest = omit(
    props,
    "class",
    "id",
    "positionArea",
    "style",
    "trigger",
    "children",
  )
  const isHover = () => props.trigger === "hover"
  const id = () => (isHover() ? props.id || undefined : undefined)
  untrack(() => {
    if (isHover() && !extendsAnchor(props.class)) {
      warnMissingId("Anchor", id(), "interestfor")
    }
  })

  return (
    <AnchorContext
      value={{
        get floatingId() {
          return id()
        },
        get popover() {
          return isHover() ? ("hint" as const) : undefined
        },
      }}
    >
      <span
        class={cx([!extendsAnchor(props.class) && "ui-anchor", props.class])}
        id={isHover() ? undefined : props.id}
        style={mergeStyle(
          { "--ui-anchor-position-area": props.positionArea },
          props.style,
        )}
        {...rest}
      >
        {props.children}
      </span>
    </AnchorContext>
  )
}
