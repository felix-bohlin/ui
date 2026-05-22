<script lang="ts">
  import type { Props } from "./types.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"
  import { getContext, type Snippet } from "svelte"

  export const title = "Select"

  const {
    class: className,
    description,
    critical,
    dense,
    id,
    items,
    name,
    spread,
    size,
    endText,
    variant = "outlined",

    // Snippets
    children,
    footer,
    header,
    label,
    prefix,
    suffix,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  const componentId = $props.id()
  const currentFieldName = getContext<FieldSet.Context["name"]>("name")
  const selectId = $derived(id || `select-${componentId}`)
  const fieldName = $derived(name || currentFieldName)
  const labelId = $derived(`select-label-${componentId}`)
  const endTextId = $derived(`end-text-${componentId}`)
  const classes = $derived([
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ])
</script>

{#snippet snippetString(ss: Snippet | string | undefined)}
  {#if typeof ss === "string"}
    {ss}
  {:else}
    {@render ss?.()}
  {/if}
{/snippet}

<label class={classes} bind:this={element} data-invalid={critical || undefined}>
  {#if label}
    <span class="ui-label" id={labelId}>
      {@render snippetString(label)}
    </span>
  {/if}
  {#if description}
    <span class="ui-start-text">
      {@render snippetString(description)}
    </span>
  {/if}
  <span class="ui-field">
    <select
      aria-labelledby={label ? labelId : undefined}
      id={selectId}
      name={fieldName}
      {...rest}
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class={["ui-list", { "ui-dense": dense }]}>
        {#if Array.isArray(items)}
          {#each items as item}
            <option value={item.value}>{item.text}</option>
          {/each}
        {:else}
          {@render children?.()}
        {/if}
      </div>
    </select>
    {#if prefix}
      <span class="ui-prefix">{@render snippetString(prefix)}</span>
    {/if}
    {#if suffix}
      <span class="ui-suffix">{@render snippetString(suffix)}</span>
    {/if}
    {#if header}
      <span class="ui-header">{@render snippetString(header)}</span>
    {/if}
    {#if footer}
      <span class="ui-footer">{@render snippetString(footer)}</span>
    {/if}
  </span>
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {@render snippetString(endText)}
    </span>
  {/if}
</label>
