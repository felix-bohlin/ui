<script lang="ts">
  import RadioInput from "./RadioInput.svelte"
  import { getFieldContext } from "../FieldGroup/context"
  import type { RadioProps as Props } from "./types.svelte"

  let {
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    name,
    ref = $bindable(null),
    size,
    stack,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const field = getFieldContext()
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
</script>

<label
  bind:this={ref}
  class={[
    "ui-radio",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
    },
    className,
  ]}
  data-invalid={error || undefined}
>
  <RadioInput
    aria-describedby={endTextId}
    bind:group
    name={name || field?.name}
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
