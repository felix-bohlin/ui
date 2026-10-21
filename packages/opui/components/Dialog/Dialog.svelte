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
  const headerId = `dialog-header-${uid}`
  const labelledBy = $derived(autoLabelledBy(rest, headerId))

  setDialogContext({
    get headerId() {
      return labelledBy
    },
  })
</script>

<dialog
  aria-labelledby={labelledBy}
  class={["ui-dialog", "ui-card", "ui-elevated", className]}
  {closedby}
  {...rest}
>
  {@render children?.()}
</dialog>
