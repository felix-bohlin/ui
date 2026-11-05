/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { useDrawerContext } from "./context.solid"
import { warnReplacedId } from "../dev"
import { cx } from "../cx"
import type { DrawerTitleProps as Props } from "./types.solid"

export default function DrawerTitle(props: Props) {
  const rest = omit(props, "class", "id", "children")
  const drawer = useDrawerContext()
  untrack(() => {
    warnReplacedId("DrawerTitle", "Drawer", props.id, drawer?.titleId)
  })

  return (
    <h2 class={cx([props.class])} id={drawer?.titleId ?? props.id} {...rest}>
      {props.children}
    </h2>
  )
}
