<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { getTabsContext, setTabsContext } from "./context.svelte"
  import { isSelected } from "../ToggleGroup/selection"
  import { warnGroupedChecked } from "../dev"
  import { defined } from "../attrs"
  import type { TabsItemProps as Props } from "./types.svelte"

  let {
    checked,
    class: className,
    defaultChecked,
    id,
    name,
    onchange,
    value,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const parent = getTabsContext()
  const uid = $props.id()
  const groupName = $derived(name || parent?.groupName || `tabs-${uid}`)
  const tabId = $derived(id || `tab-${uid}`)
  const grouped = $derived(isSelected(parent?.value, value))
  untrack(() =>
    warnGroupedChecked("TabsItem", grouped, checked ?? defaultChecked, "Tabs"),
  )
  const isChecked = () => grouped ?? checked ?? !!defaultChecked
  const initialChecked = untrack(isChecked)
  const change = (input: HTMLInputElement) => {
    parent?.change?.(input)
  }
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
  {@attach seedChecked(isChecked, change)}
  defaultChecked={grouped === undefined
    ? (defaultChecked ?? initialChecked)
    : initialChecked}
  class={["ui-input", className]}
  id={tabId}
  name={groupName}
  type="radio"
  {value}
  {...defined(rest)}
  onchange={(event) => {
    change(event.currentTarget)
    onchange?.(event)
  }}
/>{@render children?.()}
