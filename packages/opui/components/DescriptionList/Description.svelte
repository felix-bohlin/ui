<script lang="ts">
  import type { DescriptionProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<dd bind:this={ref} class={["ui-description", className]} {...rest}>
  {@render children?.()}
</dd>
