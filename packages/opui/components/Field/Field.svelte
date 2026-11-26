<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { DEV, warnControlAttributes } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    autoFit,
    class: className,
    dense,
    dropZone,
    for: htmlFor,
    hideLabel,
    size,
    spread,
    variant,

    // Snippets
    children,
    bottom,
    end,
    endText,
    label,
    start,
    startText,
    top,
    ...rest
  }: Props = $props()

  const hasLabel = $derived(Boolean(label))
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText))
  const startId = $derived(start ? `${htmlFor}-start` : undefined)
  const endId = $derived(end ? `${htmlFor}-end` : undefined)
  const topId = $derived(top ? `${htmlFor}-top` : undefined)
  const bottomId = $derived(bottom ? `${htmlFor}-bottom` : undefined)
  const startTextId = $derived(
    hasStartText ? `${htmlFor}-start-text` : undefined,
  )
  const endTextId = $derived(hasEndText ? `${htmlFor}-end-text` : undefined)
  if (DEV) untrack(() => warnControlAttributes("Field", rest))
</script>

<div
  class={[
    "ui-field",
    {
      "ui-auto-fit": autoFit,
      "ui-dense": dense,
      "ui-drop-zone": dropZone,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
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
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field-container">
    {#if top}
      <span class="ui-top" id={topId}>
        {@render content(top)}
      </span>
    {/if}
    {#if start}
      <span class="ui-start" id={startId}>
        {@render content(start)}
      </span>
    {/if}
    {@render children?.()}
    {#if end}
      <span class="ui-end" id={endId}>
        {@render content(end)}
      </span>
    {/if}
    {#if bottom}
      <span class="ui-bottom" id={bottomId}>
        {@render content(bottom)}
      </span>
    {/if}
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</div>
