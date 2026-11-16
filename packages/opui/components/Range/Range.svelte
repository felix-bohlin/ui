<script lang="ts">
  import "../../css/js/range.js"
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { formatValue, middleValue } from "./value"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-labelledby": ariaLabelledBy,
    "aria-valuetext": ariaValueText,
    class: className,
    defaultValue,
    error,
    hideLabel,
    id,
    items,
    lang,
    list,
    max,
    min,
    name,
    size,
    spread,
    step,
    style,
    value = $bindable(),
    valueSuffix,
    variant,

    // Snippets
    datalist,
    endText,
    label,
    startText,
    valueText,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const uid = $props.id()
  const getValue = () => value ?? defaultValue
  const setValue = (next: typeof value) => {
    value = next
  }
  const initialValue = untrack(getValue)
  const base = $derived(id || `range-${uid}`)
  const hasLabel = $derived(!!label)
  const hasStartText = $derived(!!startText)
  const hasEndText = $derived(!!endText)
  const hasValueText = $derived(valueText)
  const hasValue = $derived(valueSuffix !== undefined || hasValueText)
  const hasDatalist = $derived(!!items || datalist)
  const current = $derived(getValue() ?? middleValue({ max, min, step }))
  const readout = $derived(
    `${formatValue(current, { lang, min, step })}${valueSuffix ?? ""}`,
  )
  const tick = $derived(
    items?.find(
      (option) =>
        typeof option === "object" && Number(option.value) === Number(current),
    ),
  )
  const tickLabel = $derived(
    valueSuffix || typeof tick !== "object" ? undefined : tick.label,
  )
  const inputId = $derived(id || (hasValue ? base : undefined))
  const labelId = $derived(hasLabel ? `${base}-label` : undefined)
  const startTextId = $derived(hasStartText ? `${base}-start-text` : undefined)
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
  const listId = $derived(list ?? (hasDatalist ? `${base}-list` : undefined))
  const describedBy = $derived(idRefs(startTextId, endTextId, ariaDescribedBy))
</script>

<label
  class={[
    "ui-range",
    { "ui-spread": spread },
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "outlined" && `ui-${variant}`,
    className,
  ]}
  for={hasValue ? inputId : undefined}
  {lang}
  {style}
>
  {#if hasLabel}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]} id={labelId}>
      {@render content(label)}
    </span>
  {/if}
  {#if hasValue}
    <output
      aria-live="off"
      class="ui-value"
      data-live={hasValueText ? undefined : ""}
      for={inputId}
      data-suffix={valueSuffix}
    >
      {#if valueText}
        {@render valueText()}
      {:else}{readout}{/if}
    </output>
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <input
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : ariaInvalid}
    aria-labelledby={labelId ?? ariaLabelledBy}
    aria-valuetext={ariaValueText ??
      (valueSuffix && !hasValueText ? readout : tickLabel)}
    id={inputId}
    list={listId}
    {max}
    {min}
    name={name ?? field?.name}
    {step}
    type="range"
    bind:value={getValue, setValue}
    defaultValue={defaultValue ?? initialValue}
  />
  {#if hasDatalist}
    <datalist aria-hidden="true" id={listId}>
      {#each items ?? [] as option, index (index)}
        {#if typeof option === "object"}
          <option value={option.value} label={option.label}></option>
        {:else}
          <option value={option}></option>
        {/if}
      {/each}{@render datalist?.()}
    </datalist>
  {/if}
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</label>
