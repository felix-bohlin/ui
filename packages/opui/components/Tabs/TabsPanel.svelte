<script lang="ts">
  import type { TabsPanelProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-tab-panel", className]} {...rest}>
  {@render children?.()}
</div>
