<script lang="ts">
  import type { FieldStartTextProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-start-text", className]} {...rest}>
  {@render children?.()}
</span>
