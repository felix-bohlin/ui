<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "legend",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const isLegend = $derived(Tag === "legend")
</script>

<svelte:element
  this={Tag}
  class={[{ "ui-legend": !isLegend }, className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
