<script lang="ts">
  import type { TabsPanelProps as Props } from "./types.svelte"
  import { getTabsContext } from "./context.svelte"

  const {
    children,
    class: className,
    panelId,
    tabId,
    ...rest
  }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }

  const context = getTabsContext()
  const classes = $derived(["ui-tab-panel", className])
</script>

<div
  bind:this={element}
  aria-labelledby={tabId || context?.tabId}
  class={classes}
  id={panelId || context?.panelId}
  role="tabpanel"
  {...rest}
>
  {@render children?.()}
</div>
