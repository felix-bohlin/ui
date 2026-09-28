<script lang="ts">
  import { getContext } from "svelte"
  import RadioInput from "./RadioInput.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"
  import type { RadioProps as Props } from "./types.svelte"

  export const title = "Radio"

  const {
    class: className,
    error,
    hideLabel,
    name,
    size,
    stack,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  const id = $props.id()
  const currentFieldName = getContext<FieldSet.Context["name"]>("name")
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
  const finalName = $derived(name || currentFieldName)
  const classes = $derived([
    "ui-radio",
    size && `ui-${size}`,
    { "ui-stack": stack },
    className,
  ])
</script>

<label bind:this={element} class={classes} data-invalid={error || undefined}>
  <RadioInput aria-describedby={endTextId} name={finalName} {...rest} />
  <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}
    >{@render children?.()}</span
  >
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
