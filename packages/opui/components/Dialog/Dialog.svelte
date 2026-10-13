<script lang="ts">
  import { setDialogContext } from "./context"
  import type { Props } from "./types.svelte"

  let { children, class: className, closedby, ...rest }: Props = $props()

  const uid = $props.id()
  const headerId = `dialog-header-${uid}`
  const labelledBy = $derived(
    rest["aria-label"] || rest["aria-labelledby"] ? undefined : headerId,
  )

  setDialogContext({
    get headerId() {
      return labelledBy
    },
  })
</script>

<dialog
  aria-labelledby={labelledBy}
  class={["ui-dialog ui-card ui-elevated", className]}
  {closedby}
  {...rest}
>
  {@render children?.()}
</dialog>
