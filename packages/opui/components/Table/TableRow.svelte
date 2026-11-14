<script lang="ts">
  import type { TableRowProps as Props } from "./types.svelte"

  let {
    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<tr {...rest}>
  {@render children?.()}
</tr>
