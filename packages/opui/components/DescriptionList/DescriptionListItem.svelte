<script lang="ts">
  import type { DescriptionListItemProps as Props } from "./types.svelte"

  let {
    class: className,
    total,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={[total && "ui-total", className]} {...rest}>
  {@render children?.()}
</div>
