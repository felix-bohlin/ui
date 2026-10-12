<script lang="ts">
  import { getDialogContext } from "./context"
  import type { DialogHeaderProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()

  const dialog = getDialogContext()
</script>

<hgroup class={[className]} id={dialog?.headerId} {...rest}>
  {@render children?.()}
</hgroup>
