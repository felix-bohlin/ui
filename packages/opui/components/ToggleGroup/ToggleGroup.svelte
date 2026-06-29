<script lang="ts">
  import type { Props } from "./types.svelte"
  import { setToggleContext, type ToggleContext } from "./context.svelte"

  export const title = "Toggle Group"

  const {
    children,
    class: className,
    name,
    orientation,
    selection = "multiple",
    size = "default",
    ...rest
  }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }

  const id = $props.id()
  const toggleContext = $state<ToggleContext>({
    groupName: "",
    inputType: "checkbox",
  })
  setToggleContext(toggleContext)
  $effect(() => {
    toggleContext.groupName = name || `toggle-group-${id}`
    toggleContext.inputType = selection === "single" ? "radio" : "checkbox"
  })
</script>

<div
  bind:this={element}
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
