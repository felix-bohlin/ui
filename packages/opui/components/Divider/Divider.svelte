<script lang="ts">
  import type { Props } from "./types.svelte"

  let { class: className, variant, ...rest }: Props = $props()
</script>

<hr class={["ui-divider", variant && `ui-${variant}`, className]} {...rest} />
