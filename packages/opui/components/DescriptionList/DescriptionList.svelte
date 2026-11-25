<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    leader,
    orientation,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dl
  class={[
    "ui-description-list",
    leader && `ui-leader-${leader}`,
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</dl>
