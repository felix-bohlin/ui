<script lang="ts">
  import { setTabsContext } from "./context"
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    name,
    scrollable,
    variant,
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
    { "ui-scrollable": scrollable },
    variant && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
