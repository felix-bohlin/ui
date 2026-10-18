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
    {
      "ui-scrollable": scrollable,
      "ui-shrink": shrink,
      "ui-vertical": orientation === "vertical",
    },
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    className,
  ]}
  role="group"
  {...rest}
>
  {@render children?.()}
</div>
