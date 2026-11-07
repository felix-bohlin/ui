<script lang="ts">
  import type { AvatarGroupProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-avatar-group", className]} role="group" {...rest}>
  {@render children?.()}
</div>
