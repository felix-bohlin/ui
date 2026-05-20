<script lang="ts">
  import type { Props } from "./types.svelte"

  let props: Props = $props()
  const { size, color, variant, class: className, ...rest } = $derived(props)

  export const title = "Button" as const
  let element = $state<HTMLButtonElement | HTMLAnchorElement | null>(null)
  export { element as this }

  const classes = $derived(["button", size, color, variant, className])
</script>

<svelte:element
  this={props.as || "button"}
  bind:this={element}
  class={classes}
  disabled={props.as === "button" ? props.disabled : undefined}
  {...rest}
>
  {@render props.children?.()}
</svelte:element>
