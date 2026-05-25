import { splitProps, createUniqueId, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Accordion(props: Props) {
  const [local, rest] = splitProps(props, [
    "class",
    "name",
    "open",
    "variant",
    "children",
    "summary",
    "marker",
    "actions",
  ])

  const summaryId = createUniqueId()
  const contentId = createUniqueId()

  return (
    <details
      name={local.name}
      class={`ui-accordion ui-card ${local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`}
      open={local.open}
      {...rest}
    >
      <summary id={summaryId} aria-controls={contentId}>
        {local.summary}
        {local.marker}
      </summary>

      <div
        id={contentId}
        class="ui-content"
        role="region"
        aria-labelledby={summaryId}
      >
        {local.children}
      </div>

      <Show when={local.actions}>
        <div class="ui-actions">{local.actions}</div>
      </Show>
    </details>
  )
}
