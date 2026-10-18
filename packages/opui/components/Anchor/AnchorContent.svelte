<script lang="ts">
  import { getAnchorContext } from "./context.svelte"
  import type { AnchorContentProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()

  const anchor = getAnchorContext()
</script>

<span
  class={["ui-anchor-floating", className]}
  id={anchor?.floatingId}
  popover={anchor?.popover}
  {...rest}
>
  {@render children?.()}
</span>
