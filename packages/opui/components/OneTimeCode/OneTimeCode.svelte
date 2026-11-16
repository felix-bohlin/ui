<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import type { Props } from "./types.svelte"

  let {
    alphanumeric,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-labelledby": ariaLabelledBy,
    autocapitalize,
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
  const getValue = () => value ?? defaultValue
  const setValue = (next: typeof value) => {
    value = next
  }
  const initialValue = untrack(getValue)
  const hasLabel = $derived(Boolean(label))
  const hasEndText = $derived(Boolean(endText))
  const base = $derived(id || `one-time-code-${uid}`)
  const labelId = $derived(hasLabel ? `${base}-label` : undefined)
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
</script>

<label
  class={[
    "ui-one-time-code",
    { "ui-grouped": grouped },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if hasLabel}
    <span class="ui-label" id={labelId}>
      {@render content(label)}
    </span>
  {/if}
  <span class="ui-field">
    <input
      autocapitalize={autocapitalize ??
        (alphanumeric ? "characters" : undefined)}
      inputmode={inputmode ?? (alphanumeric ? undefined : "numeric")}
      pattern={pattern ??
        (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)}
      spellcheck={spellcheck ?? (alphanumeric ? "false" : undefined)}
      {...rest}
      aria-describedby={idRefs(endTextId, ariaDescribedBy)}
      aria-invalid={error ? "true" : ariaInvalid}
      aria-labelledby={hasLabel ? labelId : ariaLabelledBy}
      autocomplete="one-time-code"
      {id}
      maxlength={length}
      name={name ?? field?.name}
      type="text"
      bind:value={getValue, setValue}
      defaultValue={defaultValue ?? initialValue}
    />
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</label>
