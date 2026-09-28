<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    max,
    ref = $bindable(null),
    value,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  bind:this={ref}
  class={["ui-progress", className, variant && `ui-${variant}`]}
>
  <progress {max} {value} {...rest}>
    {@render children?.()}
  </progress>
</div>
