<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { Item } from "./types"
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  let {
    class: className,
    dense,
    error,
    id,
    items = [],
    name,
    size,
    spread,
    value = $bindable(),
    variant = "outlined",

    // Snippets
    children,
    description,
    endText,
    footer,
    header,
    label,
    prefix,
    suffix,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const field = getFieldContext()
  const labelId = `select-label-${uid}`
  const endTextId = $derived(endText ? `end-text-${uid}` : undefined)

  const isSelected = (item: Item) =>
    value === undefined
      ? item.selected
      : Array.isArray(value)
        ? value.includes(item.value)
        : item.value === value
</script>

{#snippet content(
  part: string | Snippet,
)}{#if typeof part === "string"}{part}{:else}{@render part()}{/if}{/snippet}

<label
  class={[
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ]}
>
  {#if label}
    <span class="ui-label" id={labelId}>
      {@render content(label)}
    </span>
  {/if}
  {#if description}
    <span class="ui-start-text">
      {@render content(description)}
    </span>
  {/if}
  <span class="ui-field">
    <select
      aria-describedby={endTextId}
      aria-invalid={error ? "true" : undefined}
      aria-labelledby={label ? labelId : undefined}
      bind:value
      {id}
      name={name ?? field?.name}
      {...rest}
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class={["ui-list", { "ui-dense": dense }]}>
        {#each items as item (item.value)}
          <option selected={isSelected(item) || undefined} value={item.value}
            >{item.text}</option
          >
        {/each}
        {@render children?.()}
      </div>
    </select>
    {#if prefix}
      <span class="ui-prefix">{@render content(prefix)}</span>
    {/if}
    {#if suffix}
      <span class="ui-suffix">{@render content(suffix)}</span>
    {/if}
    {#if header}
      <span class="ui-header">{@render content(header)}</span>
    {/if}
    {#if footer}
      <span class="ui-footer">{@render content(footer)}</span>
    {/if}
  </span>
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
