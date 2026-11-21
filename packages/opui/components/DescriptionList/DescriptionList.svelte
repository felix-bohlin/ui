<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    border,
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
    border && `ui-border-${border}`,
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
