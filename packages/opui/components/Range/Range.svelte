<script lang="ts">
  import type { RangeProps as Props } from "./types.svelte"
  import { onMount, type Snippet } from "svelte"

  export const title = "Range" as const

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
    spread,
    step,
    value = $bindable(),
    variant,

    // Snippets
    children,
    datalist,
    endText,
    startText,
    valueSuffix,
    valueText,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  let mounted = $state(false)
  onMount(() => {
    mounted = true
  })

  const componentId = $props.id()
  const hasLabel = $derived(!!label || !!children)
  const hasStartText = $derived(!!startText)
  const hasEndText = $derived(!!endText)
  const hasValue = $derived(valueSuffix !== undefined || !!valueText)
  const suffix = $derived(typeof valueSuffix === "string" ? valueSuffix : "")

  const inputId = $derived(id || `range-${componentId}`)
  const labelId = $derived(hasLabel ? `range-label-${componentId}` : undefined)
  const startTextId = $derived(
    hasStartText ? `range-start-${componentId}` : undefined,
  )
  const endTextId = $derived(
    hasEndText ? `range-end-${componentId}` : undefined,
  )
  const describedBy = $derived(
    [startTextId, endTextId].filter(Boolean).join(" ") || undefined,
  )
  const classes = $derived([
    "ui-range",
    variant && `ui-${variant}`,
    { "ui-spread": spread },
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

<label bind:this={element} class={classes}>
  {#if hasLabel}
    <span class="ui-label" id={labelId}>
      {label ?? ""}{@render children?.()}
    </span>
  {/if}
  {#if hasValue}
    <output
      class="ui-value"
      data-suffix={typeof valueSuffix === "string" ? valueSuffix : undefined}
      for={inputId}
    >
      {#if mounted}
        {value}{suffix}
      {:else if valueText}
        {@render valueText()}
      {:else}
        {value}
      {/if}
    </output>
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render snippetString(startText)}
    </span>
  {/if}
  <input
    aria-describedby={describedBy}
    aria-labelledby={labelId}
    {disabled}
    id={inputId}
    {list}
    {max}
    {min}
    {name}
    {step}
    type="range"
    bind:value
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
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render snippetString(endText)}
    </span>
  {/if}
</label>
