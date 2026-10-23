<script lang="ts">
  import { setTabsContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    overflow,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `tabs-${uid}`)

  setTabsContext({
    get groupName() {
      return groupName
    },
  })
</script>

<div
  class={[
    "ui-tabs",
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
