<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  const { children, ...rest }: Props<"td"> = $props()

  let element = $state<HTMLTableCellElement | null>(null)
  export { element as this }
</script>

<td bind:this={element} {...rest}>
  {@render children?.()}
</td>
