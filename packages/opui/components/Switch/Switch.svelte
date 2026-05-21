<script lang="ts">
  import { getContext } from "svelte"
  import SwitchInput from "./SwitchInput.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"
  import type { SwitchProps as Props } from "./types.svelte"

  export const title = "Switch"

  const {
    class: className,
    critical,
    hideLabel,
    name,
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

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }
  const id = $props.id()
  const currentFieldName = getContext<FieldSet.Context["name"]>("name")
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
  const finalName = $derived(name || currentFieldName)

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
  bind:this={element}
  class={[
    "switch",
    {
      small,
      stack,
      spread,
    },
    className,
  ]}
  data-invalid={critical || undefined}
>
  {#if iconUnchecked}
    <span class="icon-unchecked" aria-hidden="true">
      {@render iconUnchecked()}
    </span>
  {/if}
  {#if iconChecked}
    <span class="icon-checked" aria-hidden="true">
      {@render iconChecked()}
    </span>
  {/if}

  <SwitchInput aria-describedby={endTextId} name={finalName} {...rest} />
  {#if children}
    <span class={[hideLabel ? "sr-only" : "label"]}>
      {@render children()}
    </span>
  {/if}

  {#if endText}
    <span id={endTextId} class="end-text">
      {#if typeof endText === "string"}
        {endText}
      {:else}
        {@render endText?.()}
      {/if}
    </span>
  {/if}
</label>
