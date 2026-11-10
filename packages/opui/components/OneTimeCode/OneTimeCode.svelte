<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import type { Props } from "./types.svelte"

  let {
    alphanumeric,
    "aria-invalid": ariaInvalid,
    autocapitalize,
    autocomplete,
    class: className,
    defaultValue,
    error,
    grouped,
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
  const getValue = () => value ?? defaultValue
  const setValue = (next: typeof value) => {
    value = next
  }
  const initialValue = untrack(getValue)
</script>

<label
  class={[
    "ui-text-field",
    "ui-one-time-code",
    { "ui-grouped": grouped },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <span class="ui-label">
      {@render content(label)}
    </span>
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
      aria-invalid={error ? "true" : ariaInvalid}
      maxlength={length}
      name={name ?? field?.name}
      type="text"
      bind:value={getValue, setValue}
      defaultValue={defaultValue ?? initialValue}
    />
  </span>
  {#if endText}
    <span class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
