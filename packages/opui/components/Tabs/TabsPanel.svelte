<script lang="ts">
  import type { TabsPanelProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-tab-panel", className]} {...rest}>
  {@render children?.()}
</div>
