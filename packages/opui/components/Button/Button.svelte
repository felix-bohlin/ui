<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  type CommonProps<T extends "button" | "a" = "button"> = {
    as?: T
    class?: string
    color?: "critical" | "primary"
    size?: "x-small" | "small" | "large"
    variant?: "outlined" | "tonal" | "filled"
    children: Snippet
  } & HTMLAttributes<HTMLElementTagNameMap[T]>

  type Props =
    | (CommonProps<"button"> & {
        disabled?: boolean
        href?: never
      })
    | (CommonProps<"a"> & {
        disabled?: never
        href: string
      })

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

  export const title = "Button" as const
  let element = $state<HTMLButtonElement | HTMLAnchorElement | null>(null)
  export { element as this }

  const Tag = $derived(as ?? (href ? "a" : "button"))
  const isButton = $derived(Tag === "button")

  const classes = $derived(["button", size, color, variant, className])
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
