<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { DEV, warnControlAttributes } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    for: htmlFor,
    grouped,
    hideLabel,
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
  if (DEV) untrack(() => warnControlAttributes("OneTimeCode", rest))
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
    <label class={hideLabel ? "ui-sr-only" : "ui-label"} for={htmlFor}>
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
