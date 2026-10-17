<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    align,
    class: className,
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
      variant && `ui-${variant}`,
      className,
    ]}
    {...rest as HTMLAttributes<HTMLDivElement>}
  >
    {@render children()}
  </div>
{:else}
  <hr class={["ui-divider", variant && `ui-${variant}`, className]} {...rest} />
{/if}
