<script lang="ts">
  import type { ColumnProps as Props } from "./types.svelte"

  let { ref = $bindable(null), width, ...rest }: Props = $props()
</script>

<col
  bind:this={ref}
  style={width ? (width.includes(":") ? width : `width: ${width}`) : undefined}
  {...rest}
/>
