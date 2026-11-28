<script lang="ts">
  import "../../elements/select-all.js"
  import type { Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-select-all class={["ui-select-all", className]} {...rest}>
  {@render children?.()}
</opui-select-all>
