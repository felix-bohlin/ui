<script lang="ts">
  import { untrack } from "svelte"
  import { getPopoverContext } from "./context.svelte"
  import { warnReplacedId } from "../dev"
  import { classAttrs } from "../cx"
  import type { PopoverTitleProps as Props } from "./types.svelte"

  let {
    as: Tag = "h2",
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const popover = getPopoverContext()
  untrack(() => warnReplacedId("PopoverTitle", "Popover", id, popover?.titleId))
</script>

<svelte:element
  this={Tag}
  {...classAttrs([className])}
  id={popover?.titleId ?? id}
  {...rest}
>
  {@render children?.()}
</svelte:element>
