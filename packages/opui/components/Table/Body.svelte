<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"tbody"> = $props()
</script>

<tbody {...rest}>
  {@render children?.()}
</tbody>
