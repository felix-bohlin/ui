<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Progress" as const

  const {
    class: className,
    max,
    value,
    variant,
    children,
    ...rest
  }: Props = $props()

  let element = $state<HTMLProgressElement | null>(null)
  export { element as this }

  const classes = $derived([
    "ui-progress",
    className,
    variant && `ui-${variant}`,
  ])
</script>

<div class={classes}>
  <progress bind:this={element} {max} {value} {...rest}>
    {@render children?.()}
  </progress>
</div>
