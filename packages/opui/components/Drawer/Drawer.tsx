import { createUniqueId, merge, omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Drawer(rawProps: Props) {
  const props = merge(
    {
      backdrop: "blurred",
      closedby: "any",
      scrollLock: true,
      side: "inline-start",
    } as const,
    rawProps,
  )
  const rest = omit(
    props,
    "backdrop",
    "children",
    "class",
    "closedby",
    "content",
    "footer",
    "header",
    "id",
    "scrollLock",
    "side",
  )

  const uid = createUniqueId()
  const drawerId = () => props.id || uid

  return (
    <dialog
      id={drawerId()}
      class={[
        "ui-drawer",
        props.side && `ui-${props.side}`,
        {
          "ui-backdrop-transparent": props.backdrop === "transparent",
          "ui-scroll-lock": !!props.scrollLock,
        },
        props.class,
      ]}
      closedby={props.closedby}
      {...rest}
    >
      <Show when={props.header}>{props.header}</Show>

      <Show when={props.content}>
        <div class="ui-content">{props.content}</div>
      </Show>

      {props.children}

      <Show when={props.footer}>{props.footer}</Show>
    </dialog>
  )
}
