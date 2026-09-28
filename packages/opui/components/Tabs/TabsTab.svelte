<script lang="ts">
  import type { TabsTabProps as Props } from "./types.svelte"
  import { getTabsContext } from "./context.svelte"

  const { children, class: className, tabId, ...rest }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  const context = getTabsContext()
  const classes = $derived(["ui-tab-label", className])
</script>

<label
  bind:this={element}
  class={classes}
  for={tabId || context?.tabId}
  role="tab"
  {...rest}
>
  {@render children?.()}
</label>
