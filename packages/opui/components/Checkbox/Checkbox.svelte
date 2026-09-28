<script lang="ts">
  import CheckboxInput from "./CheckboxInput.svelte"
  import { getFieldContext } from "../FieldGroup/context"
  import type { CheckboxProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    name,
    ref = $bindable(null),
    size,
    spread,
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
    "ui-checkbox",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
  data-invalid={error || undefined}
>
  <CheckboxInput
    aria-describedby={endTextId}
    bind:checked
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
