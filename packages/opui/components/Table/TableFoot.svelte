<script lang="ts">
  import type { TableFootProps as Props } from "./types.svelte"

  let {
    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<tfoot {...rest}>
  {@render children?.()}
</tfoot>
