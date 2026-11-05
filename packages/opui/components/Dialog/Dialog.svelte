<script lang="ts">
  import { setDialogContext } from "./context.svelte"
  import { autoLabelledBy, createIds } from "../id"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    closedby,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const titleId = $derived(createIds(uid, "dialog", rest.id)("title"))
  const labelledBy = $derived(autoLabelledBy(rest, titleId))
  setDialogContext({
    get id() {
      return rest.id ?? undefined
    },
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
