<script lang="ts">
  import type { ClassicSelectProps as Props } from "./types.svelte"

  let {
    class: className,
    disabled,
    endText,
    error,
    id,
    items = [],
    label,
    name,
    ref = $bindable(null),
    required,
    size,
    value = $bindable(),
    variant = "outlined",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const componentId = $props.id()
  const labelId = `select-label-${componentId}`
</script>

<label
  bind:this={ref}
  class={[
    "ui-select",
    size && `ui-${size}`,
    {
      "ui-filled": variant === "filled",
    },
    className,
  ]}
  data-invalid={error || undefined}
>
  {#if label}
    <span class="ui-label" id={labelId}>
      {label}
    </span>
  {/if}
  <span class="ui-field">
    <select
      aria-labelledby={label ? labelId : undefined}
      bind:value
      {disabled}
      id={id || `select-${componentId}`}
      {name}
      {required}
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
