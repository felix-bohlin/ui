<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    markerAnimation = "rotate",
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<details
  class={[
    "ui-accordion",
    "ui-card",
    markerAnimation && `ui-marker-${markerAnimation}`,
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</details>
