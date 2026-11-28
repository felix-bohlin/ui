<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    orientation,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-field-group",
    orientation && orientation !== "auto" && `ui-${orientation}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
