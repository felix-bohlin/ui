<script lang="ts">
  import { setToggleGroupContext } from "./context"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    orientation,
    scrollable,
    selection = "multiple",
    shrink,
    size = "default",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const groupName = $derived(name || `toggle-group-${uid}`)
  const inputType = $derived(selection === "single" ? "radio" : "checkbox")

  setToggleGroupContext({
    get groupName() {
      return groupName
    },
    get inputType() {
      return inputType
    },
  })
</script>

<div
  class={[
    "ui-toggle-group",
    size !== "default" && size && `ui-${size}`,
    orientation && `ui-${orientation}`,
    { "ui-scrollable": scrollable, "ui-shrink": shrink },
    className,
  ]}
  role={selection === "single" ? "radiogroup" : "group"}
  {...rest}
>
  {@render children?.()}
</div>
