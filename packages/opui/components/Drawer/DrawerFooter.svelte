<script lang="ts">
  import type { DrawerFooterProps as Props } from "./types.svelte"

  export const title = "Drawer Footer" as const

  const { children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
</script>

<div bind:this={element} class={["ui-footer", className]} {...rest}>
  {@render children?.()}
</div>
