<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    alt,
    as,
    class: className,
    href,
    isGroup,
    ref = $bindable(null),
    src,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "div"))
</script>

<svelte:element
  this={Tag}
  bind:this={ref}
  class={[
    { "ui-avatar": !isGroup },
    !isGroup && variant && `ui-${variant}`,
    className,
  ]}
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
