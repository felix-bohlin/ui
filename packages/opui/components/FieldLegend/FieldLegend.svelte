<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "legend",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  class={[{ "ui-legend": Tag !== "legend" }, className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
