<script lang="ts">
  import type { Props } from "./types.svelte"
  import { setTabsContext } from "./context.svelte"

  export const title = "Tabs" as const

  const { children, class: className, name, ...rest }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }

  const id = $props.id()
  const groupName = $derived(name || `tabs-${id}`)
  setTabsContext({
    get groupName() {
      return groupName
    },
  })

  const classes = $derived(["ui-tabs", className])
</script>

<div bind:this={element} class={classes} role="tablist" {...rest}>
  {@render children?.()}
</div>
