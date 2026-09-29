<script lang="ts">
  import SwitchInput from "./SwitchInput.svelte"
  import { getFieldContext } from "../FieldGroup/context"
  import type { SwitchProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    name,
    ref = $bindable(null),
    small,
    spread,
    stack,

    // Snippets
    children,
    endText,
    iconChecked,
    iconUnchecked,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const field = getFieldContext()
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)

  $effect(() => {
    if (
      import.meta.env.DEV &&
      !children &&
      !rest["aria-label"] &&
      !rest["aria-labelledby"]
    ) {
      console.warn(
        "[OPUI Switch] Missing accessible name. Provide a child element, `aria-label`, or `aria-labelledby`.",
      )
    }
  })
</script>

<label
  bind:this={ref}
  class={[
    "ui-switch",
    {
      "ui-small": small,
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
  data-invalid={error || undefined}
>
  {#if iconUnchecked}
    <span class="ui-icon-unchecked" aria-hidden="true">
      {@render iconUnchecked()}
    </span>
  {/if}
  {#if iconChecked}
    <span class="ui-icon-checked" aria-hidden="true">
      {@render iconChecked()}
    </span>
  {/if}
  <SwitchInput
    aria-describedby={endTextId}
    bind:checked
    bind:group
    name={name || field?.name}
    {...rest}
  />
  {#if children}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {@render children()}
    </span>
  {/if}
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
