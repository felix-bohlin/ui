<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    density,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-card",
    density && density !== "normal" && `ui-${density}`,
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
