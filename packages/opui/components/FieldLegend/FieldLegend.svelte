<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "legend",
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  bind:this={ref}
  class={[{ "ui-legend": Tag !== "legend" }, className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
