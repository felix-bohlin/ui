<script lang="ts">
  import type { CardHeaderProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<hgroup class={[className]} {...rest}>
  {@render children?.()}
</hgroup>
