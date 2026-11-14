<script lang="ts">
  import "../../elements/close-on-navigate.js"
  import { untrack } from "svelte"
  import { setDrawerContext } from "./context.svelte"
  import { autoLabelledBy } from "../id"
  import { warnMissingId } from "../dev"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    backdrop = "blurred",
    class: className,
    closedby = "any",
    closeOnNavigate,
    id,
    scrollLock,
    side = "inline-start",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const labelledBy = $derived(autoLabelledBy(rest, `${id}-title`))
  untrack(() => warnMissingId("Drawer", id))
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
  data-close-on-navigate={closeOnNavigate ? "" : undefined}
  {id}
  {...defined(rest)}
>
  {@render children?.()}
</dialog>
