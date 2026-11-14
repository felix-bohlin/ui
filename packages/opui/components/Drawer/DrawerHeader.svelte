<script lang="ts">
  import { untrack } from "svelte"
  import Button from "../Button/Button.svelte"
  import { getDrawerContext } from "./context.svelte"
  import { warnMissingTarget } from "../dev"
  import type { DrawerHeaderProps as Props } from "./types.svelte"

  let {
    class: className,
    closeButton,
    closeLabel = "Close",
    commandfor,

    // Snippets
    children,
    closeIcon,
    ...rest
  }: Props = $props()

  const drawer = getDrawerContext()
  const target = $derived(commandfor ?? drawer?.id)
  untrack(() => {
    if (closeButton) warnMissingTarget("DrawerHeader", target, "Drawer")
  })
</script>

<div class={["ui-header", className]} {...rest}>
  {@render children?.()}{#if closeButton}
    <Button
      aria-label={closeLabel}
      command="close"
      commandfor={target}
      round
      size="small"
    >
      {#if closeIcon}
        {@render closeIcon()}
      {:else}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        ></svg>
      {/if}
    </Button>
  {/if}
</div>
