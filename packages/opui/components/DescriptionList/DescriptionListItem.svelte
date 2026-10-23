<script lang="ts">
  import type { DescriptionListItemProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={[className]} {...rest}>
  {@render children?.()}
</div>
