<script lang="ts">
  import type { MessageListProps as Props } from "./types.svelte"

  let {
    class: className,
    direct,
    role,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol
  class={["ui-message-list", { "ui-direct": direct }, className]}
  role={role ?? "list"}
  {...rest}
>
  {@render children?.()}
</ol>
