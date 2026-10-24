<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    orientation,
    overflow,
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
      "ui-vertical": orientation === "vertical",
    },
    color && `ui-${color}`,
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "transparent" && `ui-${variant}`,
    className,
  ]}
  role="group"
  {...rest}
>
  {@render children?.()}
</div>
