<script lang="ts">
  import "../../elements/callout.js"
  import Button from "../Button/Button.svelte"
  import { setCalloutContext } from "./context.svelte"
  import { closePath } from "./icons"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    closeButton,
    closeLabel = "Close",
    id,
    ondismiss,
    severity,
    variant,

    // Snippets
    children,
    closeIcon,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const base = $derived(id || `callout-${uid}`)
  const Root = $derived(closeButton ? "opui-callout" : "article")
  const rootId = $derived(closeButton ? base : id)
  setCalloutContext({
    get severity() {
      return severity
    },
  })
</script>

<svelte:element
  this={Root}
  class={[
    "ui-callout",
    severity && `ui-${severity}`,
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  id={rootId}
  role={closeButton ? "article" : undefined}
  {ondismiss}
  {...defined(rest)}
>
  {@render children?.()}{#if closeButton}
    <Button
      aria-label={closeLabel}
      command="--dismiss"
      commandfor={rootId}
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
</svelte:element>
