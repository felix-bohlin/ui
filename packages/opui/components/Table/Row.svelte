<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"tr"> = $props()
</script>

<tr bind:this={ref} {...rest}>
  {@render children?.()}
</tr>
