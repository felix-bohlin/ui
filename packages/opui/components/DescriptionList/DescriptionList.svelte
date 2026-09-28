<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    children,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()
</script>

<dl
  bind:this={ref}
  class={[
    "ui-description-list",
    { "ui-bordered": bordered, "ui-dotted": bordered === "dotted" },
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
