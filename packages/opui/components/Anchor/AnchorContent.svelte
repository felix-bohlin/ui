<script lang="ts">
  import { untrack } from "svelte"
  import { getAnchorContext } from "./context.svelte"
  import { DEV, warnReplacedAnchorAttributes } from "../dev"
  import type { AnchorContentProps as Props } from "./types.svelte"

  let {
    class: className,
    id,
    popover,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const anchor = getAnchorContext()
  if (DEV)
    untrack(() =>
      warnReplacedAnchorAttributes(
        id,
        popover,
        anchor?.floatingId,
        anchor?.popover,
      ),
    )
</script>

<span
  class={["ui-floating", className]}
  id={anchor?.floatingId ?? id}
  popover={anchor?.popover ?? popover}
  {...rest}
>
  {@render children?.()}
</span>
