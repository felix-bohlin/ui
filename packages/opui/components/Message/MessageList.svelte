<script lang="ts">
  import { defined } from "../attrs"
  import type { MessageListProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol class={["ui-message-list", className]} role="list" {...defined(rest)}>
  {@render children?.()}
</ol>
