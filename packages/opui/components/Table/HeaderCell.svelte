<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  export const title = "Table Header Cell" as const

  const { children, ...rest }: Props<"th"> = $props()

  let element = $state<HTMLTableCellElement | null>(null)
  export { element as this }
</script>

<th bind:this={element} {...rest}>
  {@render children?.()}
</th>
