<script lang="ts">
  import { untrack } from "svelte"
  import Button from "../Button/Button.svelte"
  import { getPopoverContext } from "./context.svelte"
  import { warnMissingCloseTarget } from "../dev"
  import { closePath } from "./icons"
  import type { PopoverHeaderProps as Props } from "./types.svelte"

  let {
    class: className,
    closeLabel,

    // Snippets
    children,
    closeIcon,
    ...rest
  }: Props = $props()

  const popover = getPopoverContext()
  untrack(() => {
    if (closeLabel)
      warnMissingCloseTarget("PopoverHeader", popover?.id, "Popover")
  })
</script>

<div class={["ui-header", className]} {...rest}>
  {@render children?.()}{#if closeLabel}
    <Button
      aria-label={closeLabel}
      command="hide-popover"
      commandfor={popover?.id}
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
        >
          <path fill="currentColor" d={closePath} />
        </svg>
      {/if}
    </Button>
  {/if}
</div>
