<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    alphanumeric,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
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
  const named = $derived(Boolean(label))
  const base = $derived(id || `one-time-code-${uid}`)
  const inputId = $derived(named ? base : id)
  const hasEndText = $derived(Boolean(endText))
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
</script>

<div
  class={[
    "ui-text-field",
    "ui-one-time-code",
    { "ui-grouped": grouped },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if named}
    <label class="ui-label" for={inputId}>
      {@render content(label)}
    </label>
  {/if}
  <span class="ui-field">
    <input
      autocapitalize={autocapitalize ??
        (alphanumeric ? "characters" : undefined)}
      autocomplete="one-time-code"
      inputmode={inputmode ?? (alphanumeric ? undefined : "numeric")}
      pattern={pattern ??
        (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)}
      spellcheck={spellcheck ?? (alphanumeric ? "false" : undefined)}
      {...defined(rest)}
      aria-describedby={idRefs(endTextId, ariaDescribedBy)}
      aria-invalid={error ? "true" : ariaInvalid}
      id={inputId}
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
</div>
