<script lang="ts">
  import type { AccordionActionsProps as Props } from "./types.svelte"

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
    "ui-actions",
    align && align !== "end" && `ui-align-${align}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
