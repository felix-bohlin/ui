<script lang="ts">
  import { untrack } from "svelte"
  import { getPopoverContext } from "./context.svelte"
  import { warnReplacedId } from "../dev"
  import { classAttrs } from "../cx"
  import type { PopoverTitleProps as Props } from "./types.svelte"

  let {
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const popover = getPopoverContext()
  untrack(() => warnReplacedId("PopoverTitle", "Popover", id, popover?.titleId))
</script>

<h2 {...classAttrs([className])} id={popover?.titleId ?? id} {...rest}>
  {@render children?.()}
</h2>
