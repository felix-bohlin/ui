<script lang="ts">
  import type { TermProps as Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<dt bind:this={ref} class={["ui-term", className]} {...rest}>
  {@render children?.()}
</dt>
