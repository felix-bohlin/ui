<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"colgroup"> = $props()
</script>

<colgroup bind:this={ref} {...rest}>
  {@render children?.()}
</colgroup>
