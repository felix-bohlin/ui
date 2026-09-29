<script lang="ts">
  import type { TabsPanelProps as Props } from "./types.svelte"
  import { getTabsContext } from "./context"

  let {
    children,
    class: className,
    panelId,
    ref = $bindable(null),
    tabId,
    ...rest
  }: Props = $props()

  const context = getTabsContext()
</script>

<div
  bind:this={ref}
  id={panelId || context?.panelId}
  class={["ui-tab-panel", className]}
  role="tabpanel"
  aria-labelledby={tabId || context?.tabId}
  {...rest}
>
  {@render children?.()}
</div>
