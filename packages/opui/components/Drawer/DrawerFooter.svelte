<script lang="ts">
  import type { DrawerFooterProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<div bind:this={ref} class={["ui-footer", className]} {...rest}>
  {@render children?.()}
</div>
