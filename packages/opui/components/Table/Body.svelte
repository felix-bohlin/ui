<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"tbody"> = $props()
</script>

<tbody bind:this={ref} {...rest}>
  {@render children?.()}
</tbody>
