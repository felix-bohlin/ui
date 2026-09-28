<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    href,
    ref = $bindable(null),
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
  bind:this={ref}
  class={[
    "ui-icon-button",
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    color && `ui-${color}`,
    className,
  ]}
  {href}
  {...rest}
>
  {@render children?.()}
</svelte:element>
