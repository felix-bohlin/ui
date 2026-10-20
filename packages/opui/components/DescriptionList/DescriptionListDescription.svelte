<script lang="ts">
  import type { DescriptionListDescriptionProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dd class={[className]} {...rest}>
  {@render children?.()}
</dd>
