<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    stickyHeader,
    variant,
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
