<script lang="ts">
  import { setToggleGroupContext } from "./context.svelte"
  import { selectionOf } from "./selection"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,
    overflow,
    selection = "multiple",
    size,
    value = $bindable(),

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `toggle-group-${uid}`)
  const inputType = $derived(selection === "single" ? "radio" : "checkbox")

  setToggleGroupContext({
    change(input) {
      value = selectionOf(input, selection)
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
    {
      "ui-vertical": orientation === "vertical",
    },
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  role={selection === "single" ? "radiogroup" : "group"}
  {...rest}
>
  {@render children?.()}
</div>
