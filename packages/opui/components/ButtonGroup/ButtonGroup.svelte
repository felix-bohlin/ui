<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    orientation,
    scrollable,
    shrink,
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-button-group",
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    orientation && `ui-${orientation}`,
    { "ui-scrollable": scrollable, "ui-shrink": shrink },
    className,
  ]}
  role="group"
  {...rest}
>
  {@render children?.()}
</div>
