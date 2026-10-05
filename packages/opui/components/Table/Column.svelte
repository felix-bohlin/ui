<script lang="ts">
  import type { ColumnProps as Props } from "./types.svelte"

  let { style, width, ...rest }: Props = $props()

  const widthStyle = $derived(
    width ? `${width.includes(":") ? width : `width: ${width}`};` : "",
  )
</script>

<col style={`${widthStyle}${style ?? ""}` || undefined} {...rest} />
