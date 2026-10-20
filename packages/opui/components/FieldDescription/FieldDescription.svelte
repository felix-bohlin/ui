<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<p class={["ui-field-description", className]} {...rest}>
  {@render children?.()}
</p>
