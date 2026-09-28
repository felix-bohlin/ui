<script lang="ts">
  import type { TabsTabProps as Props } from "./types.svelte"
  import { getTabsContext } from "./context"

  let {
    children,
    class: className,
    ref = $bindable(null),
    tabId,
    ...rest
  }: Props = $props()

  const context = getTabsContext()
</script>

<label
  bind:this={ref}
  for={tabId || context?.tabId}
  class={["ui-tab-label", className]}
  role="tab"
  {...rest}
>
  {@render children?.()}
</label>
