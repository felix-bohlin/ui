<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { RangeProps as Props } from "./types.svelte"

  let {
    class: className,
    endText,
    error,
    id,
    label,
    list,
    max,
    min,
    name,
    options,
    spread,
    startText,
    step,
    value = $bindable(),
    valueSuffix,
    variant,

    // Snippets
    children,
    datalist,
    valueText,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const field = getFieldContext()

  const hasLabel = $derived(!!label || !!children)
  const hasValue = $derived(valueSuffix !== undefined || !!valueText)
  const defaultValue = $derived.by(() => {
    const minValue = Number(min ?? 0)
    const maxValue = Math.max(minValue, Number(max ?? 100))
    const stepValue = step === "any" ? 0 : Number(step ?? 1)
    const middle = minValue + (maxValue - minValue) / 2
    if (!stepValue) return middle
    const stepped =
      minValue + Math.round((middle - minValue) / stepValue) * stepValue
    return stepped > maxValue ? stepped - stepValue : stepped
  })

  const inputId = $derived(id || (hasValue ? `range-${uid}` : undefined))
  const labelId = $derived(hasLabel ? `range-label-${uid}` : undefined)
  const startTextId = $derived(startText ? `range-start-${uid}` : undefined)
  const endTextId = $derived(endText ? `range-end-${uid}` : undefined)
  const describedBy = $derived(
    [startTextId, endTextId].filter(Boolean).join(" ") || undefined,
  )
</script>

<label
  class={[
    "ui-range",
    variant && `ui-${variant}`,
    { "ui-spread": spread },
    className,
  ]}
>
  {#if hasLabel}
    <span class="ui-label" id={labelId}>
      {label}
      {@render children?.()}
    </span>
  {/if}
  {#if hasValue}
    <output class="ui-value" for={inputId} data-suffix={valueSuffix}>
      {#if valueText}{@render valueText()}{:else}{value ??
          defaultValue}{valueSuffix ?? ""}{/if}
    </output>
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}>
      {#if typeof startText === "string"}{startText}{:else}{@render startText()}{/if}
    </span>
  {/if}
  <input
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : undefined}
    aria-labelledby={labelId}
    id={inputId}
    {list}
    {max}
    {min}
    name={name ?? field?.name}
    {step}
    type="range"
    bind:value
    {...rest}
  />
  {#if options || datalist}
    <datalist id={list}>
      {#each options ?? [] as option (typeof option === "object" ? option.value : option)}
        {#if typeof option === "object"}
          <option value={option.value} label={option.label}></option>
        {:else}
          <option value={option}></option>
        {/if}
      {/each}
      {@render datalist?.()}
    </datalist>
  {/if}
  {#if endText}
    <span class="ui-end-text" id={endTextId}>
      {#if typeof endText === "string"}{endText}{:else}{@render endText()}{/if}
    </span>
  {/if}
</label>
