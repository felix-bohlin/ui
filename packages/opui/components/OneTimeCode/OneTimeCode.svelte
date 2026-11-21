<script lang="ts">
  import { content } from "../content.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    for: htmlFor,
    grouped,
    size,

    // Snippets
    children,
    endText,
    label,
    ...rest
  }: Props = $props()

  const hasLabel = $derived(Boolean(label))
  const hasEndText = $derived(Boolean(endText))
  const endTextId = $derived(hasEndText ? `${htmlFor}-end-text` : undefined)
</script>

<div
  class={[
    "ui-one-time-code",
    { "ui-grouped": grouped },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {...rest}
>
  {#if hasLabel}
    <label class="ui-label" for={htmlFor}>
      {@render content(label)}
    </label>
  {/if}
  <span class="ui-field-container">
    {@render children?.()}
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</div>
