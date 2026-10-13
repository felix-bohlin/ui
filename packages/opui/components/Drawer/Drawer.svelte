<script lang="ts">
  import { setDrawerContext } from "./context"
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
  const titleId = $derived(`${drawerId}-heading`)
  const labelledBy = $derived(
    rest["aria-label"] || rest["aria-labelledby"] ? undefined : titleId,
  )

  setDrawerContext({
    get id() {
      return drawerId
    },
    get titleId() {
      return titleId
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
