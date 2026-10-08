<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    alt,
    as,
    class: className,
    href,
    isGroup,
    size,
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
  class={[
    { "ui-avatar": !isGroup, "ui-avatar-group": isGroup },
    !isGroup && size && `ui-${size}`,
    !isGroup && variant && `ui-${variant}`,
    className,
  ]}
  {href}
  role={isGroup ? "group" : undefined}
  type={Tag === "button" ? "button" : undefined}
  {...rest}
>
  {#if src}
    <img {src} alt={alt ?? ""} />
  {:else}
    {@render children?.()}
  {/if}
</svelte:element>
