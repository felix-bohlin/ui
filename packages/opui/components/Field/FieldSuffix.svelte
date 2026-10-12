<script lang="ts">
  import type { FieldSuffixProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-suffix", className]} {...rest}>
  {@render children?.()}
</span>
