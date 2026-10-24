<script lang="ts">
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    alt,
    as,
    class: className,
    disabled,
    href,
    shape,
    size,
    src,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "div"))
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-avatar",
    shape && shape !== "circle" && `ui-${shape}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...rest}
>
  {#if src}
    <img {src} alt={alt ?? ""} />
  {:else}
    {@render children?.()}
  {/if}
</svelte:element>
