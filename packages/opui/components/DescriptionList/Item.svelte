<script lang="ts">
  import type { ItemProps as Props } from "./types.svelte"

  const { children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
</script>

<div bind:this={element} class={["ui-item", className]} {...rest}>
  {@render children?.()}
</div>
