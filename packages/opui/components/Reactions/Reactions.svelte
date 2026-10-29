<script lang="ts">
  import "../../elements/reactions.js"
  import type { Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-reactions class={["ui-reactions", className]} {...rest}>
  {@render children?.()}
  <span class="ui-sr-only" role="status"></span>
</opui-reactions>
