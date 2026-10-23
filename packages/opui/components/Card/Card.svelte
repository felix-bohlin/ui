<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-card",
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
