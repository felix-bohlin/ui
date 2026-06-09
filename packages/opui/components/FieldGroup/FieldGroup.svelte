<script lang="ts">
  import type { Props } from "./types.svelte"
  export const title = "Field Group" as const

  const {
    children,
    class: className,
    direction,
    name,
    type: inputType,
    ...rest
  }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
  const classes = $derived([
    "ui-field-group",
    direction && `ui-${direction}`,
    className,
  ])
</script>

<div bind:this={element} class={classes} {...rest} role="group">
  {@render children?.()}
</div>
