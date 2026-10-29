<script lang="ts">
  import "../../elements/command.js"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    emptyLabel,
    filter,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-command
  class={[
    "ui-command",
    variant && variant !== "transparent" && `ui-${variant}`,
    className,
  ]}
  empty-label={emptyLabel}
  filter={filter && filter !== "auto" ? filter : undefined}
  {...rest}
>
  {@render children?.()}
  <p role="status"></p>
</opui-command>
