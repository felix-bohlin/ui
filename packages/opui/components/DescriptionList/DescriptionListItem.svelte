<script lang="ts">
  import { classAttrs } from "../cx"
  import type { DescriptionListItemProps as Props } from "./types.svelte"

  let {
    class: className,
    total,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div {...classAttrs([total && "ui-total", className])} {...rest}>
  {@render children?.()}
</div>
