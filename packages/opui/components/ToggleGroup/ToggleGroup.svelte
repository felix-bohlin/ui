<script lang="ts">
  import { untrack } from "svelte"
  import { selectionOf } from "./selection"
  import { setToggleGroupContext } from "./context.svelte"
  import { warnUnnamedGroup } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    multiple,
    name,
    orientation,
    overflow,
    role,
    size,
    value = $bindable(),

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `toggle-group-${uid}`)
  const inputType = $derived(multiple ? "checkbox" : "radio")
  untrack(() => warnUnnamedGroup("ToggleGroup", rest))
  setToggleGroupContext({
    change(input) {
      if (value !== undefined) value = selectionOf(input, multiple)
    },
    get groupName() {
      return groupName
    },
    get inputType() {
      return inputType
    },
    get value() {
      return value
    },
  })
</script>

<div
  class={[
    "ui-toggle-group",
    { "ui-vertical": orientation === "vertical" },
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  role={role ?? (multiple ? "group" : "radiogroup")}
  {...rest}
>
  {@render children?.()}
</div>
