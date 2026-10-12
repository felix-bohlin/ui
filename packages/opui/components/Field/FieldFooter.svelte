<script lang="ts">
  import type { FieldFooterProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-footer", className]} {...rest}>
  {@render children?.()}
</span>
