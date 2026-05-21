<script lang="ts">
  import { Props } from "./types.svelte"

  let {
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

  export const title = "Icon Button" as const
  let element = $state<HTMLButtonElement | HTMLAnchorElement | null>(null)
  export { element as this }

  const Tag = $derived(as ?? (href ? "a" : "button"))
  const isButton = $derived(Tag === "button")

  const classes = $derived(["icon-button", size, variant, color, className])
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={classes}
  class:disabled={isButton ? disabled : undefined}
  disabled={isButton ? disabled : undefined}
  href={!isButton ? href : undefined}
  {...rest}
>
  {@render children?.()}
</svelte:element>
