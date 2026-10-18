<script lang="ts">
  import type { TableBodyProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<tbody {...rest}>
  {@render children?.()}
</tbody>
