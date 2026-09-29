<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    variant,
    ...rest
  }: Props = $props()
</script>

<table
  bind:this={ref}
  class={["ui-table", className, variant && `ui-${variant}`]}
  {...rest}
>
  {@render children?.()}
</table>
