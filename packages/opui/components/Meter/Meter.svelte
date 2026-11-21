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

<meter
  class={[
    "ui-meter",
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</meter>
