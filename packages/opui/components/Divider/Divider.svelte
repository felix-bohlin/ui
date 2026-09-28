<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    ref = $bindable(null),
    variant,
    ...rest
  }: Props = $props()
</script>

<hr
  bind:this={ref}
  class={["ui-divider", className, variant && `ui-border-${variant}`]}
  {...rest}
/>
