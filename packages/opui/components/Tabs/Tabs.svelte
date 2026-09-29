<script lang="ts">
  import type { Props } from "./types.svelte"
  import { setTabsContext } from "./context"

  let {
    children,
    class: className,
    name,
    ref = $bindable(null),
    ...rest
  }: Props = $props()

  const id = $props.id()
  const groupName = $derived(name || `tabs-${id}`)

  setTabsContext({
    get groupName() {
      return groupName
    },
  })
</script>

<div bind:this={ref} class={["ui-tabs", className]} role="tablist" {...rest}>
  {@render children?.()}
</div>
