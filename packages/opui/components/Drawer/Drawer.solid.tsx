/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import "../../elements/close-on-navigate.js"
import "../../elements/drawer-swipe.js"
import { defined } from "../attrs"
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
    "closeOnNavigate",
    "id",
    "scrollLock",
    "side",
    "children",
  )
  const backdrop = () =>
    props.backdrop === undefined ? "blurred" : props.backdrop
  const closedby = () => (props.closedby === undefined ? "any" : props.closedby)
  const side = () => (props.side === undefined ? "inline-start" : props.side)
  const labelledBy = () => autoLabelledBy(rest, `${props.id}-title`)
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
        data-close-on-navigate={props.closeOnNavigate ? "" : undefined}
        id={props.id}
        {...defined(rest)}
      >
        {props.children}
      </dialog>
    </DrawerContext>
  )
}
