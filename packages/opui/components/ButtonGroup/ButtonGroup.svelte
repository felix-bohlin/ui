<script lang="ts">
  import type { Props } from "./types.svelte"

  const {
    class: className,
    color,
    orientation,
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }

  const classes = $derived([
    "ui-button-group",
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    orientation && `ui-${orientation}`,
    className,
  ])
</script>

<div bind:this={element} class={classes} role="group" {...rest}>
  {@render children?.()}
</div>
