<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    disabled,
    href,
    ref = $bindable(null),
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const Tag = $derived(as || (href ? "a" : "button"))
  const isButton = $derived(Tag === "button")
</script>

<svelte:element
  this={Tag}
  bind:this={ref}
  class={[
    "ui-button",
    { "ui-disabled": isButton && disabled },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    color && `ui-${color}`,
    className,
  ]}
  disabled={isButton ? disabled : undefined}
  {href}
  {...rest}
>
  {@render children?.()}
</svelte:element>
