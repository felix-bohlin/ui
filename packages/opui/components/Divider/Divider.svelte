<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    align,
    class: className,
    color,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

{#if children}
  <div
    class={[
      "ui-divider",
      align && align !== "center" && `ui-align-${align}`,
      color && `ui-${color}`,
      variant && variant !== "outlined" && `ui-${variant}`,
      className,
    ]}
    {...rest as HTMLAttributes<HTMLDivElement>}
  >
    {@render children()}
  </div>
{:else}
  <hr
    class={[
      "ui-divider",
      color && `ui-${color}`,
      variant && variant !== "outlined" && `ui-${variant}`,
      className,
    ]}
    {...rest}
  />
{/if}
