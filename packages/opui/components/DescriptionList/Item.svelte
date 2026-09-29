<script lang="ts">
  import type { ItemProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<div bind:this={ref} class={["ui-item", className]} {...rest}>
  {@render children?.()}
</div>
