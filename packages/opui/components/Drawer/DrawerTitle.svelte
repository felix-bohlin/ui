<script lang="ts">
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
</script>

<h2 class={[className]} id={drawer?.titleId ?? id} {...rest}>
  {@render children?.()}
</h2>
