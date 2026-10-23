<script lang="ts">
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import type { Props } from "./types.svelte"

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
    style,
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
  const field = getFieldGroupContext()

  const hasLabel = $derived(!!label || !!children)
  const hasValue = $derived(valueSuffix !== undefined || !!valueText)
  const hasDatalist = $derived(!!options || !!datalist)
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
    variant && variant !== "outlined" && `ui-${variant}`,
    className,
  ]}
  for={hasValue ? inputId : undefined}
  {style}
>
  {#if hasLabel}
    <span class="ui-label" id={labelId}>
      {label}
      {@render children?.()}
    </span>
  {/if}
  {#if hasValue}
    <output class="ui-value" for={inputId} data-suffix={valueSuffix}>
      {#if valueText}{@render valueText(
          Number(value ?? defaultValue),
        )}{:else}{value ?? defaultValue}{valueSuffix ?? ""}{/if}
    </output>
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
    id={inputId}
    list={listId}
    {max}
    {min}
    name={name ?? field?.name}
    {step}
    type="range"
    bind:value
    {@attach (input) => {
      const form = input.form
      const sync = () => setTimeout(() => (value = input.valueAsNumber))
      form?.addEventListener("reset", sync)
      return () => form?.removeEventListener("reset", sync)
    }}
  />
  {#if hasDatalist}
    <datalist aria-hidden="true" id={listId}>
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
      {@render content(endText)}
    </span>
  {/if}
</label>
