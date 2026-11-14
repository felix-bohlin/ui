<script lang="ts">
  import { classAttrs } from "../cx"
  import type { DescriptionListDescriptionProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dd {...classAttrs([className])} {...rest}>
  {@render children?.()}
</dd>
