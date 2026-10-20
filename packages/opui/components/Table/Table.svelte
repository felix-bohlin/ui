<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    stickyHeader,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<table
  class={[
    "ui-table",
    { "ui-sticky-header": stickyHeader },
    variant && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</table>
