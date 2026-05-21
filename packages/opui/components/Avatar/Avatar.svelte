<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Avatar"

  const {
    alt,
    as,
    class: className,
    href,
    isGroup,
    src,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  let element = $state<
    HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null
  >(null)
  export { element as this }

  const Tag = $derived(as || (href ? "a" : "div"))
  const classes = $derived([
    { "ui-avatar": !isGroup },
    !isGroup && variant && `ui-${variant}`,
    className,
  ])
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={classes}
  {href}
  role={isGroup ? "group" : undefined}
  {...rest}
>
  {#if src}
    <img {src} {alt} />
  {:else}
    {@render children?.()}
  {/if}
</svelte:element>
