<script lang="ts">
  import { getTabsContext, setTabsContext } from "./context"
  import type { TabsItemProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    name,
    open,
    tabId,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const parent = getTabsContext()
  const groupName = $derived(name || parent?.groupName || `tabs-${uid}`)
  const computedTabId = $derived(tabId || `tab-${uid}`)

  setTabsContext({
    get groupName() {
      return groupName
    },
    get tabId() {
      return computedTabId
    },
  })
</script>

<input
  checked={open}
  class={["ui-tab-input", className]}
  id={computedTabId}
  name={groupName}
  type="radio"
  {...rest}
/>
{@render children?.()}
