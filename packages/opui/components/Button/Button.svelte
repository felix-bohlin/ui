<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as,
    class: className,
    color,
    disabled,
    href,
    iconOnly: _iconOnly,
    label,
    ripple,
    rounded,
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
  class={[
    "ui-button",
    {
      "ui-ripple": ripple,
      "ui-rounded": rounded,
    },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    color && `ui-${color}`,
    className,
  ]}
  aria-disabled={!isButton && disabled ? "true" : undefined}
  aria-label={label}
  disabled={isButton ? disabled : undefined}
  {href}
  type={isButton ? "button" : undefined}
  {...rest}
>
  {@render children?.()}
</svelte:element>
