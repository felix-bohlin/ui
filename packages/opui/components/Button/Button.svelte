<script lang="ts">
  import { disabledLink, tagAttrs } from "../tag"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    disabled,
    href,
    round,
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(
    disabledLink(as, disabled) ? "a" : as || (href ? "a" : "button"),
  )
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-button",
    { "ui-round": round },
    color && `ui-${color}`,
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "transparent" && `ui-${variant}`,
    className,
  ]}
  {...tagAttrs(Tag, disabled, href)}
  {...defined(rest)}
>
  {@render children?.()}
</svelte:element>
