import { children, createUniqueId, merge, omit, Show } from "solid-js"
import { DrawerContext } from "./context"
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
  const headings = new Set<() => string | undefined>()
  const header = children(() => (
    <DrawerContext
      value={{
        headingId: () => `${drawerId()}-heading`,
        register: (heading) => {
          headings.add(heading)
          return () => headings.delete(heading)
        },
      }}
    >
      {props.header}
    </DrawerContext>
  ))
  const labelledBy = () => {
    header()
    if (props["aria-label"] || props["aria-labelledby"]) return undefined
    return [...headings].some((heading) => heading())
      ? `${drawerId()}-heading`
      : undefined
  }

  return (
    <dialog
      id={drawerId()}
      aria-labelledby={labelledBy()}
      class={[
        "ui-drawer",
        props.side && `ui-${props.side}`,
        {
          "ui-backdrop-transparent": props.backdrop === "transparent",
          "ui-scroll-lock": props.scrollLock,
        },
        props.class,
      ]}
      closedby={props.closedby}
      {...rest}
    >
      {header()}

      <Show when={props.content}>
        <div class="ui-content">{props.content}</div>
      </Show>

      {props.children}

      {props.footer}
    </dialog>
  )
}
