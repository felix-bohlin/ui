<script lang="ts">
  import { untrack } from "svelte"
  import { warnReplacedId } from "../dev"
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

  untrack(() => warnReplacedId("DialogHeader", "Dialog", id, dialog?.headerId))
</script>

<hgroup class={[className]} id={dialog?.headerId ?? id} {...rest}>
  {@render children?.()}
</hgroup>
