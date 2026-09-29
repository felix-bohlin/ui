import { createUniqueId, omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Accordion(props: Props) {
  const rest = omit(
    props,
    "actions",
    "children",
    "class",
    "marker",
    "name",
    "open",
    "summary",
    "variant",
  )

  const summaryId = createUniqueId()
  const contentId = createUniqueId()

  return (
    <details
      name={props.name}
      class={[
        "ui-accordion",
        "ui-card",
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      open={props.open}
      {...rest}
    >
      <summary id={summaryId} aria-controls={contentId}>
        {props.summary}
        {props.marker}
      </summary>

      <div
        id={contentId}
        class="ui-content"
        role="region"
        aria-labelledby={summaryId}
      >
        {props.children}
      </div>

      <Show when={props.actions}>
        {(actions) => <div class="ui-actions">{actions()}</div>}
      </Show>
    </details>
  )
}
