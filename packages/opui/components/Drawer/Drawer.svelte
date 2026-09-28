<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Drawer" as const

  const {
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

  let element = $state<HTMLDialogElement | null>(null)
  export { element as this }

  const componentId = $props.id()
  const drawerId = $derived(id || `drawer-${componentId}`)
  const classes = $derived([
    "ui-drawer",
    side && `ui-${side}`,
    {
      "ui-backdrop-transparent": backdrop === "transparent",
      "ui-scroll-lock": scrollLock,
    },
    className,
  ])
</script>

<dialog bind:this={element} class={classes} {closedby} id={drawerId} {...rest}>
  {@render header?.()}
  {#if content}
    <div class="ui-content">
      {@render content()}
    </div>
  {/if}
  {@render children?.()}
  {@render footer?.()}
</dialog>
