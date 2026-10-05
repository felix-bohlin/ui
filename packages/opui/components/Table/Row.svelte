<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"tr"> = $props()
</script>

<tr {...rest}>
  {@render children?.()}
</tr>
