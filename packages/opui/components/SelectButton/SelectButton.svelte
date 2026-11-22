<script lang="ts">
  import type { Props } from "./types.svelte"

  let { ...rest }: Props = $props()
</script>

<button {...rest}>
  <selectedcontent></selectedcontent>
</button>
