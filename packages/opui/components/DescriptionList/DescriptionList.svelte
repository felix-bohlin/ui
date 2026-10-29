<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    class: className,
    dotted,
    orientation,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dl
  class={[
    "ui-description-list",
    {
      "ui-bordered": bordered,
      "ui-dotted": dotted,
    },
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
