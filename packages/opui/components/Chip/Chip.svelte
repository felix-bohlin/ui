<script lang="ts">
  import type { Props } from "./types.svelte"

  const {
    as,
    class: className,
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

  let element = $state<
    HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | null
  >(null)
  export { element as this }

  const Tag = $derived(as || (href ? "a" : "div"))
  const classes = $derived([
    "ui-chip",
    {
      "ui-multiline": multiline,
    },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    className,
  ])
</script>

<svelte:element this={Tag} bind:this={element} class={classes} {href} {...rest}
  >{@render start?.()}{@render children?.()}{#if label}<span class="ui-text"
      >{label}</span
    >{/if}{@render end?.()}</svelte:element
>
