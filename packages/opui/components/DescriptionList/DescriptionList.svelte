<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    class: className,
    orientation,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dl
  class={[
    "ui-description-list",
    bordered && `ui-bordered-${bordered}`,
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
