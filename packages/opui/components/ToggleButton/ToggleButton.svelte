<script lang="ts">
  import type { Props } from "./types.svelte.ts"
  import { getToggleContext } from "../ToggleGroup/context.svelte"

  export const title = "Toggle Button"

  const {
    children,
    class: className,
    disabled,
    label,
    name,
    pressed,
    size,
    type,
    value,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }

  let toggleGroup: ReturnType<typeof getToggleContext> | null = null
  try {
    toggleGroup = getToggleContext()
  } catch (_e) {
    // toggle group not set
  }

  const componentId = $props.id()
  const finalName = $derived(name || toggleGroup?.groupName)
  const finalType = $derived(type || toggleGroup?.inputType || "checkbox")
  const id = $derived(rest.id || `toggle-${componentId}`)
  const classes = $derived([
    "ui-toggle-button",
    { "ui-disabled": disabled },
    size && `ui-${size}`,
    className,
  ])
</script>

<label bind:this={element} class={classes}>
  <input
    aria-pressed={finalType === "checkbox" ? pressed : undefined}
    checked={pressed}
    {disabled}
    {id}
    name={finalName}
    type={finalType}
    value={value || label}
    {...rest}
  />
  {@render children?.()}
</label>
