<script lang="ts">
  import { untrack } from "svelte"
  import { warnUnnamedControl } from "../dev"
  import { tagAttrs } from "../tag"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    disabled,
    href,
    label,
    shape,
    size,
    src,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "div"))
  untrack(() =>
    warnUnnamedControl("Avatar", as === "button" || href, { ...rest, label }),
  )
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-avatar",
    shape && shape !== "circle" && `ui-${shape}`,
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "filled" && `ui-${variant}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...defined(rest)}
>
  {#if src}
    <img {src} alt={label ?? ""} />
  {:else}
    <span aria-hidden="true">
      {@render children?.()}
    </span>
  {/if}{#if !src && label}
    <span class="ui-sr-only">{label}</span>
  {/if}
</svelte:element>
