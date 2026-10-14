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
  const describedBy = $derived(
    [endTextId, rest["aria-describedby"]].filter(Boolean).join(" ") ||
      undefined,
  )
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
>
  {#if label}<span class="ui-label">{label}</span>{/if}
  <span class="ui-field">
    <select
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      bind:value
      id={selectId}
      name={name ?? field?.name}
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
