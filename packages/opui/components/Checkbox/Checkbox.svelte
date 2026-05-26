<script lang="ts">
  import CheckboxInput from "./CheckboxInput.svelte"
  import type { CheckboxProps as Props } from "./types.svelte"

  export const title = "Checkbox" as const

  const {
    class: className,
    critical,
    checked = $bindable(),
    hideLabel,
    indeterminate = $bindable(),
    size,
    spread,
    stack,
    id,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  const componentId = $props.id()
  const endTextId = $derived(endText ? `end-text-${componentId}` : undefined)
  const invalid = $derived(critical || undefined)
  const classes = $derived([
    "ui-checkbox",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ])
</script>

<label bind:this={element} class={classes} data-invalid={invalid}>
  <CheckboxInput
    aria-describedby={endTextId}
    {checked}
    {indeterminate}
    {...rest}
  />
  <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
    {@render children?.()}
  </span>
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {#if typeof endText === "string"}
        {endText}
      {:else}
        {@render endText()}
      {/if}
    </span>
  {/if}
</label>
