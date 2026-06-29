<script lang="ts">
  import { getContext } from "svelte"
  import SwitchInput from "./SwitchInput.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"
  import type { SwitchProps as Props } from "./types.svelte"

  export const title = "Switch"

  const {
    class: className,
    error,
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
  const classes = $derived([
    "ui-switch",
    {
      "ui-small": small,
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ])
</script>

<label bind:this={element} class={classes} data-invalid={error || undefined}>
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

  <SwitchInput aria-describedby={endTextId} name={finalName} {...rest} />
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
        {@render endText?.()}
      {/if}
    </span>
  {/if}
</label>
