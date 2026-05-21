<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Field Legend" as const

  const {
    as: Tag = "legend",
    children,
    class: className,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLegendElement | HTMLElement | null>(null)
  export { element as this }
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={[{ "ui-legend": Tag === "legend" }, className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
