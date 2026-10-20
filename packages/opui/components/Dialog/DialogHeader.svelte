<script lang="ts">
  import { getDialogContext } from "./context.svelte"
  import type { DialogHeaderProps as Props } from "./types.svelte"

  let {
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const dialog = getDialogContext()
</script>

<hgroup class={[className]} id={dialog?.headerId ?? id} {...rest}>
  {@render children?.()}
</hgroup>
