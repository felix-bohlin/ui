<script lang="ts">
  import CheckboxInput from "./CheckboxInput.svelte"
  import type { CheckboxProps as Props } from "./types.svelte"
  export const title = "Checkbox" as const

  const {
    class: className,
    critical,
    hideLabel,
    indeterminate,
    name,
    size,
    spread,
    stack,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }
  const id = $props.id()
  // TODO: const { currentFieldName } = Astro.locals
  const currentFieldName = ""
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
  const finalName = $derived(name || currentFieldName)
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
    {indeterminate}
    name={finalName}
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
