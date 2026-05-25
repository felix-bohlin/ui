import { splitProps, type JSX } from "solid-js"
import type { DrawerFooterProps } from "./types.solid"

export default function DrawerFooter(props: DrawerFooterProps) {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <div class={`ui-footer ${local.class || ""}`.trim()} {...rest}>
      {local.children}
    </div>
  )
}
