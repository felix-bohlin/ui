<script lang="ts">
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import type { SelectItem } from "./types"
  import type { Props } from "./types.svelte"
  import { untrack } from "svelte"

  let {
    class: className,
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

  untrack(() => {
    if (value === undefined && rest.multiple)
      value = items.filter((item) => item.selected).map((item) => item.value)
  })

  const uid = $props.id()
  const field = getFieldGroupContext()
  const labelId = `select-label-${uid}`
  const startTextId = $derived(startText ? `start-text-${uid}` : undefined)
  const endTextId = $derived(endText ? `end-text-${uid}` : undefined)
  const topId = $derived(top ? `top-${uid}` : undefined)
  const bottomId = $derived(bottom ? `bottom-${uid}` : undefined)
  const describedBy = $derived(
    idRefs(topId, startTextId, endTextId, bottomId, rest["aria-describedby"]),
  )

  const isSelected = (item: SelectItem) =>
    value === undefined
      ? item.selected
      : Array.isArray(value)
        ? value.includes(item.value)
        : item.value === value
</script>

<label
  class={[
    "ui-select",
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]} id={labelId}>
      {@render content(label)}
    </span>
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field">
    <select
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      aria-labelledby={label ? labelId : rest["aria-labelledby"]}
      bind:value
      {id}
      name={name ?? field?.name}
    >
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <div class={["ui-list", { "ui-dense": dense }]}>
        {#each items as item (item.value)}
          <option selected={isSelected(item) || undefined} value={item.value}
            >{item.label}</option
          >
        {/each}
        {@render children?.()}
      </div>
    </select>
    {#if start}
      <span class="ui-start">{@render content(start)}</span>
    {/if}
    {#if end}
      <span class="ui-end">{@render content(end)}</span>
    {/if}
    {#if top}
      <span class="ui-top" id={topId}>{@render content(top)}</span>
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
</label>
