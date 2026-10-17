<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"colgroup"> = $props()
</script>

<colgroup {...rest}>
  {@render children?.()}
</colgroup>
