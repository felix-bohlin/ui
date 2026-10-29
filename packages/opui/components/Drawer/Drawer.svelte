<script lang="ts">
  import { untrack } from "svelte"
  import { warnMissingId } from "../dev"
  import { autoLabelledBy } from "../id"
  import { setDrawerContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    backdrop = "blurred",
    class: className,
    closedby = "any",
    id,
    scrollLock,
    side = "inline-start",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  untrack(() => warnMissingId("Drawer", id))
  const labelledBy = $derived(autoLabelledBy(rest, `${id}-heading`))

  setDrawerContext({
    get id() {
      return id
    },
    get titleId() {
      return labelledBy
    },
  })
</script>

<dialog
  {closedby}
  class={[
    "ui-drawer",
    {
      "ui-backdrop-transparent": backdrop === "transparent",
      "ui-scroll-lock": scrollLock,
    },
    side && side !== "inline-start" && `ui-${side}`,
    className,
  ]}
  aria-labelledby={labelledBy}
  {id}
  {...rest}
>
  {@render children?.()}
</dialog>
