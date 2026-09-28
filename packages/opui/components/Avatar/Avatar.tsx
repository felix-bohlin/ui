import { omit, Show } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Avatar(props: Props) {
  const rest = omit(
    props,
    "alt",
    "as",
    "children",
    "class",
    "href",
    "isGroup",
    "src",
    "variant",
  )

  const Tag = () => props.as || (props.href ? "a" : "div")

  return (
    <Dynamic
      component={Tag()}
      class={[
        { "ui-avatar": !props.isGroup },
        !props.isGroup && props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      href={props.href}
      role={props.isGroup ? "group" : undefined}
      {...rest}
    >
      <Show when={props.src} fallback={props.children}>
        <img src={props.src} alt={props.alt} />
      </Show>
    </Dynamic>
  )
}
