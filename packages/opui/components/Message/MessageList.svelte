<script lang="ts">
  import type { MessageListProps as Props } from "./types.svelte"

  let {
    class: className,
    role,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol class={["ui-message-list", className]} role={role ?? "list"} {...rest}>
  {@render children?.()}
</ol>
