<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"th"> = $props()
</script>

<th {...rest}>
  {@render children?.()}
</th>
