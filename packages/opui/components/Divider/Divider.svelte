<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Divider" as const

  const { class: className, variant, ...rest }: Props = $props()

  let element = $state<HTMLHRElement | null>(null)
  export { element as this }
  const classes = $derived([
    "ui-divider",
    className,
    variant && `ui-border-${variant}`,
  ])
</script>

<hr bind:this={element} class={classes} {...rest} />
