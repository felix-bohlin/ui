<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"th"> = $props()
</script>

<th bind:this={ref} {...rest}>
  {@render children?.()}
</th>
