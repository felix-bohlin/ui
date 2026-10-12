<script lang="ts">
  import type { FieldPrefixProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-prefix", className]} {...rest}>
  {@render children?.()}
</span>
