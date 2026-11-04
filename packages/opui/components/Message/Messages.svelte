<script lang="ts">
  import type { MessagesProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol class={["ui-messages", className]} {...rest}>
  {@render children?.()}
</ol>
