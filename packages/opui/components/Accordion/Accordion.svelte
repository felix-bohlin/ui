<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    markerAnimation = "rotate",
    name,
    open,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<details
  {name}
  class={[
    "ui-accordion",
    "ui-card",
    markerAnimation && `ui-marker-${markerAnimation}`,
    variant && `ui-${variant}`,
    className,
  ]}
  {open}
  {...rest}
>
  {@render children?.()}
</details>
