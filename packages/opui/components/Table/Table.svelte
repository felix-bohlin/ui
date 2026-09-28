<script lang="ts">
  import type { Props } from "./types.svelte"

  const { children, class: className, variant, ...rest }: Props = $props()

  let element = $state<HTMLTableElement | null>(null)
  export { element as this }

  const classes = $derived(["ui-table", variant && `ui-${variant}`, className])
</script>

<table bind:this={element} class={classes} {...rest}>
  {@render children?.()}
</table>
