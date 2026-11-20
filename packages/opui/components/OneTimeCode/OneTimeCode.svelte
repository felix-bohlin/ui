<script lang="ts">
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { fieldDescribedBy } from "../id"
  import type { Props } from "./types.svelte"

  let {
    alphanumeric,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-labelledby": ariaLabelledBy,
    autocapitalize,
    autocomplete,
    class: className,
    defaultValue,
    error,
    grouped,
    id,
    inputmode,
    length = 6,
    name,
    pattern,
    size,
    spellcheck,
    style,
    value = $bindable(),

    // Snippets
    endText,
    label,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const uid = $props.id()
  const getValue = () => (value === undefined ? defaultValue : value)
  const setValue = (next: typeof value) => {
    value = next
  }
  const hasLabel = $derived(Boolean(label))
  const hasEndText = $derived(Boolean(endText))
  const base = $derived(id || `one-time-code-${uid}`)
  const inputId = $derived(hasLabel ? base : id)
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
</script>

<div
  class={[
    "ui-one-time-code",
    { "ui-grouped": grouped },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if hasLabel}
    <label class="ui-label" for={inputId}>
      {@render content(label)}
    </label>
  {/if}
  <span class="ui-field">
    <input
      autocapitalize={autocapitalize ??
        (alphanumeric ? "characters" : undefined)}
      autocomplete={autocomplete ?? "one-time-code"}
      inputmode={inputmode ?? (alphanumeric ? undefined : "numeric")}
      pattern={pattern ??
        (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)}
      spellcheck={spellcheck ?? (alphanumeric ? "false" : undefined)}
      {...rest}
      aria-describedby={fieldDescribedBy(
        { endText: endTextId },
        ariaDescribedBy,
      )}
      aria-invalid={error ? "true" : ariaInvalid}
      aria-labelledby={ariaLabelledBy}
      id={inputId}
      maxlength={length}
      name={name ?? field?.name}
      type="text"
      bind:value={getValue, setValue}
      {defaultValue}
    />
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</div>
