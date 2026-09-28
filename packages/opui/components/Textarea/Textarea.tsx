import { createUniqueId, omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const rest = omit(
    props,
    "autoFit",
    "children",
    "class",
    "description",
    "endText",
    "error",
    "filled",
    "footer",
    "header",
    "id",
    "label",
    "prefix",
    "small",
    "spread",
    "suffix",
    "supportingText",
  )

  const uid = createUniqueId()
  const fieldId = () => props.id || uid

  return (
    <label
      class={[
        "ui-textarea",
        {
          "ui-auto-fit": !!props.autoFit,
          "ui-filled": !!props.filled,
          "ui-spread": !!props.spread,
          "ui-small": !!props.small,
        },
        props.class,
      ]}
      data-invalid={props.error ? "true" : undefined}
    >
      <Show when={props.label}>
        <span class="ui-label">{props.label}</span>
      </Show>

      <Show when={props.description}>
        <span class="ui-start-text">{props.description}</span>
      </Show>

      <span class="ui-field">
        <textarea id={fieldId()} {...rest}></textarea>
        <Show when={props.prefix}>
          <span class="ui-prefix">{props.prefix}</span>
        </Show>
        <Show when={props.suffix}>
          <span class="ui-suffix">{props.suffix}</span>
        </Show>
        <Show when={props.header}>
          <span class="ui-header">{props.header}</span>
        </Show>
        <Show when={props.footer}>
          <span class="ui-footer">{props.footer}</span>
        </Show>
      </span>

      <Show when={props.endText || props.supportingText}>
        <span class="ui-end-text">
          {props.endText}
          {props.supportingText}
        </span>
      </Show>

      {props.children}
    </label>
  )
}
