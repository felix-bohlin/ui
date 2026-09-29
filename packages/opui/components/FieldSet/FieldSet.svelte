<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "fieldset",
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  bind:this={ref}
  class={["ui-fieldset", className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
