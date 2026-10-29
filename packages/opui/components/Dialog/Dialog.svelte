<script lang="ts">
  import { autoLabelledBy } from "../id"
  import { setDialogContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    closedby,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const titleId = `dialog-title-${uid}`
  const labelledBy = $derived(autoLabelledBy(rest, titleId))

  setDialogContext({
    get titleId() {
      return labelledBy
    },
  })
</script>

<dialog
  aria-labelledby={labelledBy}
  class={["ui-dialog", "ui-elevated", className]}
  {closedby}
  {...rest}
>
  {@render children?.()}
</dialog>
