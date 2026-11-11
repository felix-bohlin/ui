<script lang="ts">
  import { setTabsContext } from "./context.svelte"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,
    overflow,
    value = $bindable(),
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `tabs-${uid}`)
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
    orientation === "vertical" && "ui-vertical",
    overflow && overflow !== "scroll" && `ui-overflow-${overflow}`,
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  role="radiogroup"
  {...defined(rest)}
>
  {@render children?.()}
</div>
