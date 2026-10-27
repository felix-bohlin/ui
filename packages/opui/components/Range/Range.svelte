<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import type { Props } from "./types.svelte"
  import { defaultValue, resetValue } from "./value"

  let {
    class: className,
    endText,
    error,
    hideLabel,
    id,
    items,
    list,
    max,
    min,
    name,
    size,
    spread,
    startText,
    step,
    style,
    value = $bindable(),
    valueSuffix,
    variant,

    // Snippets
    datalist,
    label,
    valueText,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const field = getFieldGroupContext()
  const initialValue = untrack(() => value)
  let resets = $state(0)

  const hasLabel = $derived(!!label)
  const hasValue = $derived(valueSuffix !== undefined || !!valueText)
  const hasDatalist = $derived(!!items || !!datalist)
  const middle = $derived(defaultValue({ max, min, step }))

  const inputId = $derived(id || (hasValue ? `range-${uid}` : undefined))
  const labelId = $derived(hasLabel ? `range-label-${uid}` : undefined)
  const startTextId = $derived(startText ? `range-start-${uid}` : undefined)
  const endTextId = $derived(endText ? `range-end-${uid}` : undefined)
  const listId = $derived(
    list ?? (hasDatalist ? `range-list-${uid}` : undefined),
  )
  const describedBy = $derived(
    idRefs(startTextId, endTextId, rest["aria-describedby"]),
  )
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
  {style}
>
  {#if label}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]} id={labelId}>
      {@render content(label)}
    </span>
  {/if}
  {#if hasValue}
    {#key resets}
      <output
        aria-live="off"
        class="ui-value"
        for={inputId}
        data-suffix={valueSuffix}
      >
        {#if valueText}{@render valueText(
            Number(value ?? middle),
          )}{:else}{value ?? middle}{valueSuffix ?? ""}{/if}
      </output>
    {/key}
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <input
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : rest["aria-invalid"]}
    aria-labelledby={labelId ?? rest["aria-labelledby"]}
    aria-valuetext={rest["aria-valuetext"] ??
      (valueSuffix && !valueText
        ? `${value ?? middle}${valueSuffix}`
        : undefined)}
    id={inputId}
    list={listId}
    {max}
    {min}
    name={name ?? field?.name}
    {step}
    type="range"
    bind:value
    {@attach (input) => {
      if (!input.hasAttribute("value") && initialValue != null)
        input.defaultValue = String(initialValue)
      const form = input.form
      const sync = (event: Event) =>
        setTimeout(() => {
          if (event.defaultPrevented) return
          value = resetValue(input)
          resets++
        })
      form?.addEventListener("reset", sync)
      return () => form?.removeEventListener("reset", sync)
    }}
  />
  {#if hasDatalist}
    <datalist aria-hidden="true" id={listId}>
      {#each items ?? [] as option (typeof option === "object" ? option.value : option)}
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
      {@render content(endText)}
    </span>
  {/if}
</label>
