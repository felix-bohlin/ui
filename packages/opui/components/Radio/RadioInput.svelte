<script lang="ts">
  import type { RadioInputProps as Props } from "./types.svelte"
  const { ...props }: Props = $props()
</script>

<input type="radio" {...props} />
