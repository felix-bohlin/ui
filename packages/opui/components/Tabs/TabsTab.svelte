<script lang="ts">
  import { getTabsContext } from "./context.svelte"
  import type { TabsTabProps as Props } from "./types.svelte"

  let {
    class: className,
    tabId,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const tabs = getTabsContext()
</script>

<label for={tabId || tabs?.tabId} class={["ui-tab-label", className]} {...rest}>
  {@render children?.()}
</label>
