<script lang="ts">
  import { setToggleGroupContext } from "./context"
  import { selectionOf } from "./selection"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,
    scrollable,
    selection = "multiple",
    shrink,
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
    size && `ui-${size}`,
    orientation && `ui-${orientation}`,
    { "ui-scrollable": scrollable, "ui-shrink": shrink },
    className,
  ]}
  role={selection === "single" ? "radiogroup" : "group"}
  {...rest}
>
  {@render children?.()}
</div>
