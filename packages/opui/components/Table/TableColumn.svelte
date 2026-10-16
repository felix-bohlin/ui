<script lang="ts">
  import { mergeStyle } from "../style"
  import type { ColumnProps as Props } from "./types.svelte"

  let { style, width, ...rest }: Props = $props()
</script>

<col style={mergeStyle({ width }, style)} {...rest} />
