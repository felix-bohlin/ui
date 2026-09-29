<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  let {
    class: className,
    dense,
    error,
    id,
    items = [],
    name,
    ref = $bindable(null),
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

  const componentId = $props.id()
  const field = getFieldContext()
  const labelId = `select-label-${componentId}`
</script>

{#snippet snippetString(ss: Snippet | string | undefined)}
  {#if typeof ss === "string"}
    {ss}
  {:else}
    {@render ss?.()}
  {/if}
{/snippet}

<label
  bind:this={ref}
  class={[
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ]}
  data-invalid={error || undefined}
>
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
      bind:value
      id={id || `select-${componentId}`}
      name={name || field?.name}
      {...rest}
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class={["ui-list", { "ui-dense": dense }]}>
        {#each items as item}
          <option value={item.value}>{item.text}</option>
        {/each}
        {@render children?.()}
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
    <span id={`end-text-${componentId}`} class="ui-end-text">
      {@render snippetString(endText)}
    </span>
  {/if}
</label>
