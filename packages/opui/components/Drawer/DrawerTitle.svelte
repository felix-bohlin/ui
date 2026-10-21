<script lang="ts">
  import { untrack } from "svelte"
  import { warnReplacedId } from "../dev"
  import { getDrawerContext } from "./context.svelte"
  import type { DrawerTitleProps as Props } from "./types.svelte"

  let {
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const drawer = getDrawerContext()

  untrack(() => warnReplacedId("DrawerTitle", "Drawer", id, drawer?.titleId))
</script>

<h2 class={[className]} id={drawer?.titleId ?? id} {...rest}>
  {@render children?.()}
</h2>
