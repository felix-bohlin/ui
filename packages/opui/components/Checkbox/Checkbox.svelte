<script lang="ts">
  import CheckboxInput from "./CheckboxInput.svelte"
  import type { CheckboxProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
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
</script>

<label
  class={[
    "ui-checkbox",
    size && `ui-${size}`,
    {
      "ui-stack": stack,
      "ui-spread": spread,
    },
    className,
  ]}
>
  <CheckboxInput
    {...rest}
    aria-describedby={describedBy}
    aria-invalid={error ? "true" : undefined}
    bind:checked
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
