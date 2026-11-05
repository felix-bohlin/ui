/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { DrawerContext } from "./context.solid"
import { autoLabelledBy } from "../id"
import { warnMissingId } from "../dev"
import type { Props } from "./types.solid"

export default function Drawer(props: Props) {
  const rest = omit(
    props,
    "backdrop",
    "class",
    "closedby",
    "id",
    "scrollLock",
    "side",
    "children",
  )
  const backdrop = () => props.backdrop ?? "blurred"
  const closedby = () => props.closedby ?? "any"
  const side = () => props.side ?? "inline-start"
  const labelledBy = () => autoLabelledBy(rest, `${props.id}-heading`)
  untrack(() => {
    warnMissingId("Drawer", props.id)
  })

  return (
    <DrawerContext
      value={{
        get id() {
          return props.id
        },
        get titleId() {
          return labelledBy()
        },
      }}
    >
      <dialog
        closedby={closedby()}
        class={[
          "ui-drawer",
          {
            "ui-backdrop-transparent": backdrop() === "transparent",
            "ui-scroll-lock": props.scrollLock,
          },
          side() && side() !== "inline-start" && `ui-${side()}`,
          props.class,
        ]}
        aria-labelledby={labelledBy()}
        id={props.id}
        {...rest}
      >
        {props.children}
      </dialog>
    </DrawerContext>
  )
}
