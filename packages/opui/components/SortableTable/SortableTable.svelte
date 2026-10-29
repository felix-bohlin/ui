<script lang="ts">
  import "../../elements/sortable-table.js"
  import type { Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-sortable-table class={["ui-sortable-table", className]} {...rest}>
  {@render children?.()}
</opui-sortable-table>
