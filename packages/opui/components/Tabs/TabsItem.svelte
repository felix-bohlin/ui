<script lang="ts">
  import type { TabsItemProps as Props } from "./types.svelte"
  import { getTabsContext, setTabsContext } from "./context"

  const id = $props.id()

  let {
    children,
    class: className,
    name,
    open,
    panelId = `panel-${id}`,
    ref = $bindable(null),
    tabId = `tab-${id}`,
    ...rest
  }: Props = $props()

  const parent = getTabsContext()
  const groupName = $derived(name || parent?.groupName)

  setTabsContext({
    get groupName() {
      return groupName
    },
    get panelId() {
      return panelId
    },
    get tabId() {
      return tabId
    },
  })
</script>

<input
  bind:this={ref}
  aria-controls={panelId}
  checked={open}
  class={["ui-tab-input", className]}
  id={tabId}
  name={groupName}
  type="radio"
  {...rest}
/>
{@render children?.()}
