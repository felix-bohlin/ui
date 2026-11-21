<script lang="ts">
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { fieldDescribedBy } from "../id"
  import { initialValue, sameValue } from "./selection"
  import type { Props } from "./types.svelte"
  import { untrack } from "svelte"

  let {
    autoFit,
    class: className,
    defaultValue,
    dense,
    error,
    hideLabel,
    id,
    items = [],
    name,
    size,
    spread,
    style,
    value = $bindable(),
    variant = "outlined",

    // Snippets
    children,
    bottom,
    end,
    endText,
    label,
    start,
    startText,
    top,
    ...rest
  }: Props = $props()

  const itemValue = (selected: string | number) =>
    items.find((item) => sameValue(item.value, selected))?.value ?? selected

  untrack(() => {
    value ??= initialValue(items, rest.multiple)
    if (Array.isArray(value)) value = value.map(itemValue)
    else if (value !== undefined) value = itemValue(value)
  })

  const uid = $props.id()
  const field = getFieldGroupContext()
  const base = $derived(id || `select-${uid}`)
  const selectId = $derived(label ? base : id)
  const startTextId = $derived(startText ? `${base}-start-text` : undefined)
  const endTextId = $derived(endText ? `${base}-end-text` : undefined)
  const startId = $derived(start ? `${base}-start` : undefined)
  const endId = $derived(end ? `${base}-end` : undefined)
  const topId = $derived(top ? `${base}-top` : undefined)
  const bottomId = $derived(bottom ? `${base}-bottom` : undefined)
  const describedBy = $derived(
    fieldDescribedBy(
      {
        bottom: bottomId,
        end: endId,
        endText: endTextId,
        start: startId,
        startText: startTextId,
        top: topId,
      },
      rest["aria-describedby"],
    ),
  )
</script>

<div
  class={[
    "ui-select",
    {
      "ui-auto-fit": autoFit,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <label class={hideLabel ? "ui-sr-only" : "ui-label"} for={selectId}>
      {@render content(label)}
    </label>
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field-container">
    {#if top}
      <span class="ui-top" id={topId}>{@render content(top)}</span>
    {/if}
    {#if start}
      <span class="ui-start" id={startId}>{@render content(start)}</span>
    {/if}
    <select
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      aria-labelledby={rest["aria-labelledby"]}
      bind:value
      defaultValue={defaultValue ?? initialValue(items, rest.multiple)}
      id={selectId}
      name={name ?? field?.name}
    >
      <button inert>
        <selectedcontent></selectedcontent>
      </button>
      <div class={["ui-list", { "ui-dense": dense }]}>
        {#each items as item (item.value)}
          <option value={item.value}>{item.label}</option>
        {/each}
        {@render children?.()}
      </div>
    </select>
    {#if end}
      <span class="ui-end" id={endId}>{@render content(end)}</span>
    {/if}
    {#if bottom}
      <span class="ui-bottom" id={bottomId}>{@render content(bottom)}</span>
    {/if}
  </span>
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</div>
