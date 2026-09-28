<script lang="ts">
  import type { Props } from "./types.svelte"

  const {
    as,
    children,
    class: className,
    color,
    disabled,
    href,
    size,
    variant,
    ...rest
  }: Props = $props()

  let element = $state<HTMLButtonElement | HTMLAnchorElement | null>(null)
  export { element as this }

  const Tag = $derived(as ?? (href ? "a" : "button"))
  const isDisabled = $derived(Tag === "button" ? disabled : undefined)

  const classes = $derived([
    "ui-button",
    { "ui-disabled": isDisabled },
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    color && `ui-${color}`,
    className,
  ])
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={classes}
  disabled={isDisabled}
  {href}
  {...rest}
>
  {@render children?.()}
</svelte:element>
