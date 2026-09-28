<script lang="ts">
  import type { RangeProps as Props } from "./types.svelte"
  import { onMount, type Snippet } from "svelte"

  let {
    class: className,
    disabled,
    id,
    label,
    list,
    max,
    min,
    name,
    options,
    ref = $bindable(null),
    spread,
    step,
    value = $bindable(),
    valueSuffix,
    variant,

    // Snippets
    children,
    datalist,
    endText,
    startText,
    valueText,
    ...rest
  }: Props = $props()

  let mounted = $state(false)
  onMount(() => {
    mounted = true
  })

  const componentId = $props.id()
  const inputId = $derived(id || `range-${componentId}`)
  const labelId = $derived(
    label || children ? `range-label-${componentId}` : undefined,
  )
  const startTextId = $derived(
    startText ? `range-start-${componentId}` : undefined,
  )
  const endTextId = $derived(endText ? `range-end-${componentId}` : undefined)
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
  class={["ui-range", variant && `ui-${variant}`, { "ui-spread": spread }, className]}
>
  {#if labelId}
    <span class="ui-label" id={labelId}>
      {label}{@render children?.()}
    </span>
  {/if}
  {#if valueSuffix !== undefined || valueText}
    <output class="ui-value" for={inputId} data-suffix={valueSuffix}>
      {#if mounted}
        {value}{valueSuffix}
      {:else if valueText}
        {@render valueText()}
      {:else}
        {value}
      {/if}
    </output>
  {/if}
  {#if startTextId}
    <span class="ui-start-text" id={startTextId}>
      {@render snippetString(startText)}
    </span>
  {/if}
  <input
    aria-describedby={[startTextId, endTextId].filter(Boolean).join(" ") ||
      undefined}
    aria-labelledby={labelId}
    bind:value
    {disabled}
    id={inputId}
    {list}
    {max}
    {min}
    {name}
    {step}
    type="range"
    {...rest}
  />
  {#if options || datalist}
    <datalist id={list}>
      {#each options ?? [] as option}
        {#if typeof option === "object"}
          <option value={option.value} label={option.label}></option>
        {:else}
          <option value={option}></option>
        {/if}
      {/each}
      {@render datalist?.()}
    </datalist>
  {/if}
  {#if endTextId}
    <span class="ui-end-text" id={endTextId}>
      {@render snippetString(endText)}
    </span>
  {/if}
</label>
