<script lang="ts">
  import type { ClassicSelectProps as Props } from "./types.svelte"

  export const title = "Classic Select" as const

  let {
    class: className,
    disabled,
    endText,
    error,
    id,
    items = [],
    label,
    name,
    required,
    size,
    value = $bindable(),
    variant = "outlined",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  const componentId = $props.id()
  const selectId = $derived(id || `select-${componentId}`)
  const labelId = `select-label-${componentId}`
  const classes = $derived([
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
    },
    className,
  ])
</script>

<label bind:this={element} class={classes} data-invalid={error || undefined}>
  {#if label}
    <span class="ui-label" id={labelId}>
      {label}
    </span>
  {/if}
  <span class="ui-field">
    <select
      aria-labelledby={label ? labelId : undefined}
      {disabled}
      id={selectId}
      {name}
      {required}
      bind:value
      {...rest}
    >
      {#each items as item}
        <option value={item.value}>{item.text}</option>
      {/each}
      {@render children?.()}
    </select>
  </span>
  {#if endText}
    <span class="ui-end-text">{endText}</span>
  {/if}
</label>
