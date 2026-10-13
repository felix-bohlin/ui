<script lang="ts">
  import { getDrawerContext } from "./context"
  import type { DrawerTitleProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()

  const drawer = getDrawerContext()
</script>

<h2 class={[className]} id={drawer?.titleId} {...rest}>
  {@render children?.()}
</h2>
