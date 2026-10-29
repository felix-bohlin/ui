<script lang="ts">
  import type { DrawerFooterProps as Props } from "./types.svelte"

  let {
    align,
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-footer",
    align && align !== "end" && `ui-align-${align}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
