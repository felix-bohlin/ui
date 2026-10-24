<script lang="ts">
  import { getTabsContext } from "./context.svelte"
  import type { TabsLabelProps as Props } from "./types.svelte"

  let {
    class: className,
    for: htmlFor,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const tabs = getTabsContext()
</script>

<label for={htmlFor || tabs?.tabId} class={["ui-label", className]} {...rest}>
  {@render children?.()}
</label>
