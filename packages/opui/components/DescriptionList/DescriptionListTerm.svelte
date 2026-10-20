<script lang="ts">
  import type { DescriptionListTermProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dt class={[className]} {...rest}>
  {@render children?.()}
</dt>
