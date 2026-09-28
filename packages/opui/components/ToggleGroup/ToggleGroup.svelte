<script lang="ts">
  import type { Props } from "./types.svelte"
  import { setToggleGroupContext } from "./context"

  let {
    children,
    class: className,
    name,
    orientation,
    ref = $bindable(null),
    selection = "multiple",
    size = "default",
    ...rest
  }: Props = $props()

  const id = $props.id()

  setToggleGroupContext({
    get groupName() {
      return name || `toggle-group-${id}`
    },
    get inputType() {
      return selection === "single" ? "radio" : "checkbox"
    },
  })
</script>

<div
  bind:this={ref}
  class={[
    "ui-toggle-group",
    size !== "default" && size && `ui-${size}`,
    orientation && `ui-${orientation}`,
    className,
  ]}
  role={selection === "single" ? "radiogroup" : "group"}
  {...rest}
>
  {@render children()}
</div>
