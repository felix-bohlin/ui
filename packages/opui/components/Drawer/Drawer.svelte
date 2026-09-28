<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    backdrop = "blurred",
    class: className,
    closedby = "any",
    id,
    ref = $bindable(null),
    scrollLock = true,
    side = "inline-start",

    // Snippets
    children,
    content,
    footer,
    header,
    ...rest
  }: Props = $props()

  const componentId = $props.id()
</script>

<dialog
  bind:this={ref}
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
  id={id || `drawer-${componentId}`}
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
