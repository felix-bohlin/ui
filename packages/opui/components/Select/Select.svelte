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
    endText,
    footer,
    header,
    label,
    prefix,
    startText,
    suffix,
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
  const describedBy = $derived(
    idRefs(startTextId, endTextId, rest["aria-describedby"]),
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
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ]}
  {style}
>
  {#if label}
    <span class="ui-label" id={labelId}>
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
            >{item.text}</option
          >
        {/each}
        {@render children?.()}
      </div>
    </select>
    {#if prefix}
      <span class="ui-prefix">{@render content(prefix)}</span>
    {/if}
    {#if suffix}
      <span class="ui-suffix">{@render content(suffix)}</span>
    {/if}
    {#if header}
      <span class="ui-header">{@render content(header)}</span>
    {/if}
    {#if footer}
      <span class="ui-footer">{@render content(footer)}</span>
    {/if}
  </span>
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
