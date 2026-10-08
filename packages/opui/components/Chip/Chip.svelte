<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    dot,
    href,
    label,
    multiline,
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
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    className,
  ]}
  href={Tag === "a" ? href : undefined}
  type={Tag === "button" ? "button" : undefined}
  {...rest}
  >{@render start?.()}{@render children?.()}{#if label}<span class="ui-text"
      >{label}</span
    >{/if}{@render end?.()}</svelte:element
>
