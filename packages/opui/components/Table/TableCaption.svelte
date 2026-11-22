<script lang="ts">
  import type { TableCaptionProps as Props } from "./types.svelte"

  let {
    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<caption {...rest}>
  {@render children?.()}
</caption>
