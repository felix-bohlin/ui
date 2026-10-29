<script lang="ts">
  import { untrack } from "svelte"
  import { warnReplacedId } from "../dev"
  import { getDialogContext } from "./context.svelte"
  import type { DialogTitleProps as Props } from "./types.svelte"

  let {
    class: className,
    id,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const dialog = getDialogContext()

  untrack(() => warnReplacedId("DialogTitle", "Dialog", id, dialog?.titleId))
</script>

<h2 class={[className]} id={dialog?.titleId ?? id} {...rest}>
  {@render children?.()}
</h2>
