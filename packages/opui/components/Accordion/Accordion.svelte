<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    markerAnimation,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<details
  class={[
    "ui-accordion",
    markerAnimation &&
      markerAnimation !== "rotate" &&
      `ui-marker-animation-${markerAnimation}`,
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</details>
