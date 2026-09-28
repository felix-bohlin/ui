<script lang="ts">
  import type { ColumnProps as Props } from "./types.svelte"

  const { width, ...rest }: Props = $props()

  let element = $state<HTMLTableColElement | null>(null)
  export { element as this }

  const style = $derived(
    width ? (width.includes(":") ? width : `width: ${width}`) : undefined,
  )
</script>

<col bind:this={element} {style} {...rest} />
