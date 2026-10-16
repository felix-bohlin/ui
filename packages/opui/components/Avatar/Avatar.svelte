<script lang="ts">
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    alt,
    as,
    class: className,
    disabled,
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
  role={isGroup ? "group" : undefined}
  {...tagAttrs(Tag, disabled, href)}
  {...rest}
>
  {#if src}
    <img {src} alt={alt ?? ""} />
  {:else}
    {@render children?.()}
  {/if}
</svelte:element>
