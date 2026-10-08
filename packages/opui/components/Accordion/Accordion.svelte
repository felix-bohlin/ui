<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    markerAnimation = "rotate",
    name,
    open,
    variant,

    // Snippets
    actions,
    children,
    marker,
    summary,
    ...rest
  }: Props = $props()
</script>

<details
  {name}
  class={[
    "ui-accordion",
    "ui-card",
    markerAnimation && `ui-marker-${markerAnimation}`,
    variant && `ui-${variant}`,
    className,
  ]}
  {open}
  {...rest}
>
  <summary
    >{#if typeof summary === "string"}{summary}{:else}{@render summary?.()}{/if}{#if marker}{@render marker()}{:else}<svg
        class="ui-marker"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
        ></path></svg
      >{/if}</summary
  >

  <div class="ui-content">
    {@render children?.()}
  </div>

  {#if actions}
    <div class="ui-actions">
      {@render actions()}
    </div>
  {/if}
</details>
