<script lang="ts">
  import type { FieldControlProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<span class={["ui-field", className]} {...rest}>
  {@render children?.()}
</span>
