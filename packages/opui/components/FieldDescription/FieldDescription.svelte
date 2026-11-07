<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<p class={["ui-description", className]} {...rest}>
  {@render children?.()}
</p>
