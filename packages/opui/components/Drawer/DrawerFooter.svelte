<script lang="ts">
  import type { DrawerFooterProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-footer", className]} {...rest}>
  {@render children?.()}
</div>
