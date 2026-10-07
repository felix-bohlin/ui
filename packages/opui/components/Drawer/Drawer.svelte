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
    content,
    footer,
    header,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const drawerId = $derived(id || `drawer-${uid}`)
  const headingId = $derived(`${drawerId}-heading`)
  const labelledBy = $derived(
    header && !rest["aria-label"] && !rest["aria-labelledby"]
      ? headingId
      : undefined,
  )

  setDrawerContext({
    get headingId() {
      return headingId
    },
    get id() {
      return drawerId
    },
  })

  const labelHeading = (dialog: HTMLDialogElement) => {
    if (!labelledBy || dialog.querySelector(`[id="${labelledBy}"]`)) return
    const heading = dialog.querySelector("h1, h2, h3, h4, h5, h6")
    if (!heading) {
      dialog.removeAttribute("aria-labelledby")
      return
    }
    if (!heading.id) heading.id = labelledBy
    dialog.setAttribute("aria-labelledby", heading.id)
  }
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
  {@attach labelHeading}
  {...rest}
>
  {@render header?.()}

  {#if content}
    <div class="ui-content">
      {@render content()}
    </div>
  {/if}

  {@render children?.()}

  {@render footer?.()}
</dialog>
