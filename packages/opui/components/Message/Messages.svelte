<script lang="ts">
  import { defined } from "../attrs"
  import type { MessagesProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol class={["ui-messages", className]} role="list" {...defined(rest)}>
  {@render children?.()}
</ol>
