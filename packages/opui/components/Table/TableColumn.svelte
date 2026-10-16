<script lang="ts">
  import { mergeStyle } from "../style"
  import type { TableColumnProps as Props } from "./types.svelte"

  let { style, width, ...rest }: Props = $props()
</script>

<col style={mergeStyle({ width }, style)} {...rest} />
