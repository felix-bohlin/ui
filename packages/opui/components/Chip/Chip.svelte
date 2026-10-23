<script lang="ts">
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    disabled,
    dot,
    href,
    label,
    multiline,
    severity,
    size,
    variant = "tonal",

    // Snippets
    children,
    end,
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
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...rest}
  >{@render start?.()}{@render children?.()}{#if label}<span class="ui-text"
      >{label}</span
    >{/if}{@render end?.()}</svelte:element
>
