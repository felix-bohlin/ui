<script lang="ts">
  import { classAttrs } from "../cx"
  import type { DescriptionListTermProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dt {...classAttrs([className])} {...rest}>
  {@render children?.()}
</dt>
