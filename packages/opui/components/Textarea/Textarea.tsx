import { omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const fieldGroup = useContext(FieldGroupContext)
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
    "name",
    "prefix",
    "small",
    "spread",
    "suffix",
    "supportingText",
  )

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
      data-invalid={props.error ? "" : undefined}
    >
      <Show when={props.label}>
        <span class="ui-label">{props.label}</span>
      </Show>

      <Show when={props.description}>
        <span class="ui-start-text">{props.description}</span>
      </Show>

      <span class="ui-field">
        <textarea
          id={props.id}
          name={props.name ?? fieldGroup.name}
          {...rest}
        ></textarea>
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
