<script lang="ts">
  import type { TermProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<dt class={["ui-term", className]} {...rest}>
  {@render children?.()}
</dt>
