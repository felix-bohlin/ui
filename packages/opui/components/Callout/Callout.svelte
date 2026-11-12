<script lang="ts">
  import "../../elements/callout.js"
  import Button from "../Button/Button.svelte"
  import { setCalloutContext } from "./context.svelte"
  import { closePath } from "./icons"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    closeLabel = "Close",
    dismissible,
    id,
    severity,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const base = $derived(id || `callout-${uid}`)
  const Root = $derived(dismissible ? "opui-callout" : "article")
  const rootId = $derived(dismissible ? base : id)
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
  role={dismissible ? "article" : undefined}
  {...defined(rest)}
>
  {@render children?.()}{#if dismissible}
    <Button
      aria-label={closeLabel}
      command="--dismiss"
      commandfor={rootId}
      round
      size="small"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" d={closePath} />
      </svg>
    </Button>
  {/if}
</svelte:element>
