<script lang="ts">
  import { setTabsContext } from "./context.svelte"
  import { createId } from "../id"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    overflow,
    value = $bindable(),
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const idOf = $derived(createId(uid))
  const groupName = $derived(name || idOf("tabs"))
  setTabsContext({
    change(input) {
      if (value !== undefined) value = input.value
    },
    get groupName() {
      return groupName
    },
    get value() {
      return value
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
