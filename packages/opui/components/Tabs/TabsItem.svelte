<script lang="ts">
  import { untrack } from "svelte"
  import { warnGroupedChecked } from "../dev"
  import { isSelected } from "../ToggleGroup/selection"
  import { getTabsContext, setTabsContext } from "./context.svelte"
  import type { TabsItemProps as Props } from "./types.svelte"

  let {
    checked,
    class: className,
    id,
    name,
    onchange,
    value,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const parent = getTabsContext()
  const groupName = $derived(name || parent?.groupName || `tabs-${uid}`)
  const tabId = $derived(id || `tab-${uid}`)
  const grouped = $derived(isSelected(parent?.value, value))

  untrack(() => warnGroupedChecked("TabsItem", grouped, checked, "Tabs"))

  setTabsContext({
    get groupName() {
      return groupName
    },
    get tabId() {
      return tabId
    },
  })
</script>

<input
  checked={grouped ?? checked}
  class={["ui-input", className]}
  id={tabId}
  name={groupName}
  type="radio"
  {value}
  {...rest}
  onchange={(event) => {
    parent?.change?.(event.currentTarget)
    onchange?.(event)
  }}
/>
{@render children?.()}
