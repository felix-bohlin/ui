<script lang="ts">
  import { untrack } from "svelte"
  import RadioInput from "./RadioInput.svelte"
  import type { RadioProps as Props } from "./types.svelte"

  let {
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    size,
    spread,
    stack,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const endTextId = $derived(endText ? `end-text-${id}` : undefined)
  const describedBy = $derived(
    [endTextId, rest["aria-describedby"]].filter(Boolean).join(" ") ||
      undefined,
  )

  if (
    import.meta.env.DEV &&
    untrack(() => !children && !rest["aria-label"] && !rest["aria-labelledby"])
  ) {
    console.warn(
      "[OPUI Radio] Missing accessible name. Provide a default slot, and set `hideLabel` to hide it visually.",
    )
  }
</script>

<label
  class={[
    "ui-radio",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
>
  <RadioInput
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : rest["aria-invalid"]}
    bind:group
  />
  {#if children}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {@render children()}
    </span>
  {/if}
  {#if endText}
    <span id={endTextId} class="ui-end-text">
      {#if typeof endText === "string"}{endText}{:else}{@render endText()}{/if}
    </span>
  {/if}
</label>
