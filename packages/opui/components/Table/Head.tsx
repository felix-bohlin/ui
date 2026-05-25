import { splitProps, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function Head(props: Props) {
  const [local, rest] = splitProps(props, ["class", "as", "children"])
  
  return (
    <Dynamic component={local.as || "div"} class={`ui-head ${local.class || ""}`} {...rest}>
      {local.children}
    </Dynamic>
  )
}
