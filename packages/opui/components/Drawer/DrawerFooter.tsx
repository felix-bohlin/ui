import { omit } from "solid-js"
import type { DrawerFooterProps } from "./types.solid"

export default function DrawerFooter(props: DrawerFooterProps) {
  const rest = omit(props, "children", "class")

  return (
    <div class={["ui-footer", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
