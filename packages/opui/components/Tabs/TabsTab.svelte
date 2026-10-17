<script lang="ts">
  import { getTabsContext } from "./context"
  import type { TabsTabProps as Props } from "./types.svelte"

  let { children, class: className, tabId, ...rest }: Props = $props()

  const tabs = getTabsContext()
</script>

<label for={tabId || tabs?.tabId} class={["ui-tab-label", className]} {...rest}>
  {@render children?.()}
</label>
