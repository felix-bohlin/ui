<script lang="ts">
  import type { TableRowProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<tr {...rest}>
  {@render children?.()}
</tr>
