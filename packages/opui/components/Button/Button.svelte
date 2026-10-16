<script lang="ts">
  import { tagAttrs } from "../tag"
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    disabled,
    href,
    iconOnly: _iconOnly,
    round,
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "button"))
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-button",
    { "ui-round": round },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    color && `ui-${color}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...rest}
>
  {@render children?.()}
</svelte:element>
