<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    class: className,
    dense,
    gutterless,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ul
  class={[
    "ui-list",
    {
      "ui-bordered": bordered,
      "ui-dense": dense,
      "ui-gutterless": gutterless,
    },
    variant && variant !== "filled" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</ul>
