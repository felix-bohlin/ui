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
</script>

<label
  bind:this={element}
  class={[
    "checkbox",
    size,
    {
      stack,
      spread,
    },
    className,
  ]}
  data-invalid={invalid}
>
  <CheckboxInput
    aria-describedby={endTextId}
    {indeterminate}
    name={finalName}
    {...rest}
  />
  <span class={[hideLabel ? "sr-only" : "label"]}>
    {@render children?.()}
  </span>
  {#if endText}
    <span id={endTextId} class="end-text">
      {#if typeof endText === "string"}
        {endText}
      {:else}
        {@render endText()}
      {/if}
    </span>
  {/if}
</label>
