<script lang="ts">
  import type { Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<p class={["ui-field-description", className]} {...rest}>
  {@render children?.()}
</p>
