<script lang="ts">
  import { autoLabelledBy } from "../id"
  import { setDrawerContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    backdrop = "blurred",
    class: className,
    closedby = "any",
    id,
    scrollLock = true,
    side = "inline-start",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const drawerId = $derived(id || `drawer-${uid}`)
  const labelledBy = $derived(autoLabelledBy(rest, `${drawerId}-heading`))

  setDrawerContext({
    get id() {
      return drawerId
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
    side && `ui-${side}`,
    {
      "ui-backdrop-transparent": backdrop === "transparent",
      "ui-scroll-lock": scrollLock,
    },
    className,
  ]}
  aria-labelledby={labelledBy}
  id={drawerId}
  {...rest}
>
  {@render children?.()}
</dialog>
