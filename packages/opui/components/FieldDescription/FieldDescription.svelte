<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<p bind:this={ref} class={["ui-field-description", className]} {...rest}>
  {@render children?.()}
</p>
