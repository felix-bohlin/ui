/* @jsxImportSource solid-js */
import { splitProps, createUniqueId, Show, mergeProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

const insetMap: Record<string, string> = {
  "start start": "auto 100% 100% auto",
  "start end": "auto auto 100% 100%",
  "end start": "100% 100% auto auto",
  "end end": "100% auto auto 100%",
}

export default function Anchor(rawProps: Props) {
  const props = mergeProps({ trigger: "always" }, rawProps)
  const [local, rest] = splitProps(props, [
    "alignment",
    "class",
    "id",
    "trigger",
    "children",
    "anchored",
  ])

  const isHover = () => local.trigger === "hover"
  const uid = createUniqueId()
  const computedId = () => (isHover() ? local.id ?? uid : undefined)

  const positionArea = () =>
    local.alignment
      ? {
          "--anchor-position-area": local.alignment,
          "--_anchor-inset": insetMap[local.alignment],
        }
      : {}

  return (
    <span
      class={`ui-anchor ${local.class || ""}`}
      style={positionArea() as JSX.CSSProperties}
      {...rest}
    >
      <Show when={isHover()} fallback={local.children}>
        {/* @ts-ignore */}
        <span interestfor={computedId()}>{local.children}</span>
      </Show>
      <span
        class="ui-anchor-floating"
        id={computedId()}
        // @ts-ignore
        popover={isHover() ? "hint" : undefined}
      >
        {local.anchored}
      </span>
    </span>
  )
}
