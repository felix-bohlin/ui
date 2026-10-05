<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { ClassicSelectProps as Props } from "./types.svelte"

  let {
    class: className,
    endText,
    error,
    id,
    items = [],
    label,
    name,
    size,
    value = $bindable(),
    variant = "outlined",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const field = getFieldContext()
  const selectId = $derived(id || `select-${uid}`)
  const endTextId = $derived(endText ? `end-text-${uid}` : undefined)
</script>

<label
  class={[
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
    },
    className,
  ]}
  data-invalid={error ? "" : undefined}
>
  {#if label}<span class="ui-label">{label}</span>{/if}
  <span class="ui-field">
    <select
      aria-describedby={endTextId}
      aria-invalid={error ? "true" : undefined}
      bind:value
      id={selectId}
      name={name ?? field?.name}
      {...rest}
    >
      {#each items as item (item.value)}
        <option value={item.value}>{item.text}</option>
      {/each}
      {@render children?.()}
    </select>
  </span>
  {#if endText}
    <span class="ui-end-text" id={endTextId}>{endText}</span>
  {/if}
</label>
