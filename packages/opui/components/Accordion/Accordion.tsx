import { omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Accordion(props: Props) {
  const rest = omit(
    props,
    "actions",
    "children",
    "class",
    "marker",
    "markerAnimation",
    "name",
    "open",
    "summary",
    "variant",
  )

  const markerAnimation = () => props.markerAnimation ?? "rotate"

  return (
    <details
      name={props.name}
      class={[
        "ui-accordion",
        "ui-card",
        markerAnimation() && `ui-marker-${markerAnimation()}`,
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      open={props.open}
      {...rest}
    >
      <summary>
        {props.summary}
        <Show
          when={props.marker}
          fallback={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
              ></path>
            </svg>
          }
        >
          {props.marker}
        </Show>
      </summary>

      <div class="ui-content">{props.children}</div>

      <Show when={props.actions}>
        <div class="ui-actions">{props.actions}</div>
      </Show>
    </details>
  )
}
