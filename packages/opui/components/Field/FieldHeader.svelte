<script lang="ts">
  import type { FieldHeaderProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-header", className]} {...rest}>
  {@render children?.()}
</span>
