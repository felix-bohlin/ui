<script lang="ts">
  import { setContext, untrack } from "svelte"
  import type { Props } from "./types.svelte"

  const {
    children,
    class: className,
    direction,
    name,
    ...rest
  }: Props = $props()

  const fieldName = untrack(() => name)
  if (fieldName) setContext("name", fieldName)

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
