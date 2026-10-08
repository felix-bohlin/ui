<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    bordered,
    children,
    class: className,
    inline,
    ...rest
  }: Props = $props()
</script>

<dl
  class={[
    "ui-description-list",
    {
      "ui-bordered": bordered,
      "ui-dotted": bordered === "dotted",
      "ui-inline": inline,
    },
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
