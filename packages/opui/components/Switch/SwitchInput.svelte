<script lang="ts">
  import type { SwitchInputProps as Props } from "./types.svelte"

  const { ...rest }: Props = $props()
</script>

<input type="checkbox" role="switch" {...rest} />
