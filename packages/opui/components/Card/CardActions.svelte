<script lang="ts">
  import type { CardActionsProps as Props } from "./types.svelte"

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
    align && align !== "start" && `ui-align-${align}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
