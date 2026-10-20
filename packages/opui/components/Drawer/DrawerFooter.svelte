<script lang="ts">
  import type { DrawerFooterProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-footer", className]} {...rest}>
  {@render children?.()}
</div>
