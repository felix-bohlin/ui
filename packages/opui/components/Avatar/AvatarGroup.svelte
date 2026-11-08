<script lang="ts">
  import { defined } from "../attrs"
  import type { AvatarGroupProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-avatar-group", className]} role="group" {...defined(rest)}>
  {@render children?.()}
</div>
