<script lang="ts">
  import { content } from "../content.svelte"
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    disabled,
    dot,
    href,
    multiline,
    severity,
    size,
    variant = "tonal",

    // Snippets
    end,
    label,
    start,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "div"))
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-chip",
    {
      "ui-dot": dot,
      "ui-multiline": multiline,
    },
    severity && `ui-${severity}`,
    size && size !== "medium" && `ui-${size}`,
    variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...rest}
  >{@render start?.()}{#if label}<span class="ui-text"
      >{@render content(label)}</span
    >{/if}{@render end?.()}</svelte:element
>
