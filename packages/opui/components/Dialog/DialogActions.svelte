<script lang="ts">
  import type { DialogActionsProps as Props } from "./types.svelte"

  let {
    align,
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={["ui-actions", { "ui-align-start": align === "start" }, className]}
  {...rest}
>
  {@render children?.()}
</div>
