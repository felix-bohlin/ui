<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    class: className,
    dense,
    flush,
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
      "ui-flush": flush,
    },
    variant && variant !== "filled" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</ul>
