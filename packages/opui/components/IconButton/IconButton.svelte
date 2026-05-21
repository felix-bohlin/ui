<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Icon Button" as const

  let {
    as = "button",
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
  const isDisabled = $derived(as === "button" ? disabled : undefined)

  const classes = $derived([
    "ui-button",
    { "ui-disabled": isDisabled },
    className,
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
  ])
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={classes}
  disabled={isDisabled}
  {...rest}
>
  {@render children?.()}
</svelte:element>
