<script lang="ts">
  import { untrack } from "svelte"
  import { setTabsContext } from "./context.svelte"
  import { warnUnnamedGroup } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,
    overflow,
    role,
    value = $bindable(),
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `tabs-${uid}`)
  untrack(() => {
    if (role === "radiogroup") warnUnnamedGroup("Tabs", rest)
  })
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
  {role}
  {...rest}
>
  {@render children?.()}
</div>
