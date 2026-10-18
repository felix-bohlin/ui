<script lang="ts">
  import { getDialogContext } from "./context.svelte"
  import type { DialogHeaderProps as Props } from "./types.svelte"

  let { children, class: className, id, ...rest }: Props = $props()

  const dialog = getDialogContext()
</script>

<hgroup class={[className]} id={dialog?.headerId ?? id} {...rest}>
  {@render children?.()}
</hgroup>
