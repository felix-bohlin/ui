<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-card", variant && `ui-${variant}`, className]} {...rest}>
  {@render children?.()}
</div>
