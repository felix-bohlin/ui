<script lang="ts">
  import type { TabsItemProps as Props } from "./types.svelte"
  import { getTabsContext, setTabsContext } from "./context.svelte"

  const id = $props.id()
  const {
    children,
    class: className,
    name,
    open,
    panelId = `panel-${id}`,
    tabId = `tab-${id}`,
    ...rest
  }: Props = $props()

  let element = $state<HTMLInputElement | null>(null)
  export { element as this }

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

  const classes = $derived(["ui-tab-input", className])
</script>

<input
  bind:this={element}
  aria-controls={panelId}
  checked={open}
  class={classes}
  id={tabId}
  name={groupName}
  type="radio"
  {...rest}
/>
{@render children?.()}
