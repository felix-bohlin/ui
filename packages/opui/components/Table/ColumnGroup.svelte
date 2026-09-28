<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  export const title = "Table Column Group" as const

  const { children, ...rest }: Props<"colgroup"> = $props()

  let element = $state<HTMLTableColElement | null>(null)
  export { element as this }
</script>

<colgroup bind:this={element} {...rest}>
  {@render children?.()}
</colgroup>
