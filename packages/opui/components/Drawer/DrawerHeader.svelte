<script lang="ts">
  import IconButton from "../IconButton/IconButton.svelte"
  import type { DrawerHeaderProps as Props } from "./types.svelte"

  const { children, class: className, heading, ...rest }: Props = $props()

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }

  const closeDrawer = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement | null
    target?.closest("dialog")?.close()
  }
</script>

<div bind:this={element} class={["ui-header", className]} {...rest}>
  {#if heading}
    <span>{heading}</span>
  {/if}
  {@render children?.()}
  <IconButton onclick={closeDrawer} title="Close">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
      ></path>
    </svg>
  </IconButton>
</div>
