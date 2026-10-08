<script lang="ts">
  import type { MessagesProps as Props } from "./types.svelte"

  let { children, class: className, label, ...rest }: Props = $props()
</script>

<ol aria-label={label} class={["ui-messages", className]} {...rest}>
  {@render children?.()}
</ol>
