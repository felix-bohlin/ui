/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { useDrawerContext } from "./context.solid"
import { DEV, warnReplacedId } from "../dev"
import type { DrawerTitleProps as Props } from "./types.solid"

export default function DrawerTitle(props: Props) {
  const rest = omit(props, "class", "id", "children")
  const drawer = useDrawerContext()
  if (DEV)
    untrack(() => {
      warnReplacedId("DrawerTitle", "Drawer", props.id, drawer?.titleId)
    })

  return (
    <h2 class={props.class} id={drawer?.titleId ?? props.id} {...rest}>
      {props.children}
    </h2>
  )
}
