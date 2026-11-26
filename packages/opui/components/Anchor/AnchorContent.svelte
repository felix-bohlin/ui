<script lang="ts">
  import { getAnchorContext } from "./context.svelte"
  import { defined } from "../attrs"
  import type { AnchorContentProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const anchor = getAnchorContext()
</script>

<span
  class={["ui-floating", className]}
  id={anchor?.floatingId}
  popover={anchor?.popover}
  {...defined(rest)}
>
  {@render children?.()}
</span>
